import { ReadStream } from 'fs';
import { Buffer } from 'buffer';

export async function streamToBuffer(stream: ReadStream): Promise<Buffer> {
  const chunks: Uint8Array[] = [];

  return new Promise<Buffer>((resolve, reject) => {
    stream.on('data', (chunk: Uint8Array) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    stream.on('error', err => {
      reject(err);
    });
  });
}
