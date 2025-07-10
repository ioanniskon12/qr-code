// lib/ai/scene-detection.js
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobileNet from '@tensorflow-models/mobilenet';

export class SceneDetectionService {
  constructor() {
    this.cocoModel = null;
    this.mobileNetModel = null;
  }

  async loadModels() {
    if (!this.cocoModel) {
      this.cocoModel = await cocoSsd.load();
    }
    if (!this.mobileNetModel) {
      this.mobileNetModel = await mobileNet.load();
    }
  }

  async detectObjects(imageElement) {
    await this.loadModels();
    const predictions = await this.cocoModel.detect(imageElement);
    
    return predictions.map(pred => ({
      class: pred.class,
      score: pred.score,
      bbox: pred.bbox
    }));
  }

  async classifyScene(imageElement) {
    await this.loadModels();
    const predictions = await this.mobileNetModel.classify(imageElement);
    
    return predictions.map(pred => ({
      className: pred.className,
      probability: pred.probability
    }));
  }

  async detectDuplicates(photos) {
    const hashes = new Map();
    const duplicates = [];
    
    for (const photo of photos) {
      const hash = await this.calculatePerceptualHash(photo.url);
      
      if (hashes.has(hash)) {
        duplicates.push({
          original: hashes.get(hash),
          duplicate: photo,
          similarity: 1.0
        });
      } else {
        hashes.set(hash, photo);
      }
    }
    
    return duplicates;
  }

  async calculatePerceptualHash(imageUrl) {
    // Implementation of perceptual hashing algorithm
    const img = new Image();
    img.src = imageUrl;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Resize to 8x8
    canvas.width = 8;
    canvas.height = 8;
    ctx.drawImage(img, 0, 0, 8, 8);
    
    // Convert to grayscale and calculate hash
    const imageData = ctx.getImageData(0, 0, 8, 8);
    const gray = [];
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      gray.push(avg);
    }
    
    const avg = gray.reduce((a, b) => a + b) / gray.length;
    let hash = '';
    
    for (const pixel of gray) {
      hash += pixel > avg ? '1' : '0';
    }
    
    return parseInt(hash, 2).toString(16);
  }
}