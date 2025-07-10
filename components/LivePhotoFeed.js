// components/LivePhotoFeed.js
'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useWebSocket } from '@/hooks/useWebSocket';
import Image from 'next/image';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const FeedContainer = styled.div`
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 100;
`;

const PhotoItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: ${slideIn} 0.5s ease;
  background: white;
`;

const PhotoInfo = styled.div`
  padding: 1rem;
`;

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--danger);
  font-weight: bold;
  margin-bottom: 1rem;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
  
  .size {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .price {
    color: var(--primary);
  }
`;

const ShippingForm = styled.div`
  margin-top: 2rem;
`;

export default function PrintOrderModal({ isOpen, onClose, photos }) {
  const [selectedSize, setSelectedSize] = useState('8x10');
  const [quantity, setQuantity] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const printSizes = [
    { size: '4x6', price: 4.99 },
    { size: '5x7', price: 7.99 },
    { size: '8x10', price: 12.99 },
    { size: '11x14', price: 19.99 },
    { size: '16x20', price: 29.99 },
    { size: '20x30', price: 49.99 }
  ];

  const selectedPrice = printSizes.find(p => p.size === selectedSize)?.price || 0;
  const totalPrice = selectedPrice * quantity * photos.length;

  const handleOrder = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
    const response = await fetch('/api/print-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        photos: photos.map(p => p.id),
        size: selectedSize,
        quantity,
        shippingInfo,
        totalPrice
      })
    });

    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Prints" maxWidth="600px">
      <p>Order high-quality prints of {photos.length} selected photos</p>

      <PrintOptions>
        {printSizes.map(({ size, price }) => (
          <PrintOption
            key={size}
            selected={selectedSize === size}
            onClick={() => setSelectedSize(size)}
          >
            <div className="size">{size}</div>
            <div className="price">${price}</div>
          </PrintOption>
        ))}
      </PrintOptions>

      <FormGroup>
        <Label>Quantity per photo</Label>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </FormGroup>

      <ShippingForm>
        <h3>Shipping Information</h3>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type="text"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            required
          />
        </FormGroup>
        {/* Add more shipping fields */}
      </ShippingForm>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <Button variant="primary" onClick={handleOrder}>
          Proceed to Checkout
        </Button>
      </div>
    </Modal>
  );
}