// lib/video/processor.js
import ffmpeg from 'fluent-ffmpeg';
import { uploadFile } from '@/lib/storage';

export class VideoProcessor {
  async processVideo(inputPath, outputPath, options = {}) {
    const {
      resolution = '1280x720',
      bitrate = '1000k',
      codec = 'libx264',
      format = 'mp4'
    } = options;

    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          `-vcodec ${codec}`,
          `-b:v ${bitrate}`,
          `-s ${resolution}`,
          '-preset fast',
          '-crf 22'
        ])
        .format(format)
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  async generateThumbnail(videoPath, outputPath, timestamp = '00:00:01') {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: [timestamp],
          filename: outputPath,
          size: '320x240'
        })
        .on('end', () => resolve(outputPath))
        .on('error', reject);
    });
  }

  async extractMetadata(videoPath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) reject(err);
        else resolve({
          duration: metadata.format.duration,
          size: metadata.format.size,
          bitrate: metadata.format.bit_rate,
          codec: metadata.streams[0].codec_name,
          resolution: {
            width: metadata.streams[0].width,
            height: metadata.streams[0].height
          }
        });
      });
    });
  }
}
