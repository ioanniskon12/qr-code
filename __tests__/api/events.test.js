// __tests__/api/events.test.js
import { POST } from '@/app/api/events/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

jest.mock('next-auth');
jest.mock('@/lib/prisma', () => ({
  prisma: {
    event: {
      create: jest.fn(),
    },
    qRCode: {
      create: jest.fn(),
    },
  },
}));

describe('/api/events', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates event with valid data', async () => {
    getServerSession.mockResolvedValue({
      user: { id: 'user123', email: 'test@example.com' },
    });

    const mockEvent = { id: 'event123', title: 'Test Event' };
    prisma.event.create.mockResolvedValue(mockEvent);
    prisma.qRCode.create.mockResolvedValue({ code: 'EVT-2024-ABCD' });

    const request = new Request('http://localhost:3000/api/events', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Event',
        date: '2024-12-25',
        expiration: '30days',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.event).toEqual(mockEvent);
    expect(prisma.event.create).toHaveBeenCalled();
  });

  it('returns 401 for unauthenticated requests', async () => {
    getServerSession.mockResolvedValue(null);

    const request = new Request('http://localhost:3000/api/events', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});