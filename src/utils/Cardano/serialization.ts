import { Buffer } from 'buffer';

export const fromHex = (hex: any) => Buffer.from(hex, 'hex');
export const toHex = (bytes: any) => Buffer.from(bytes).toString('hex');
export const fromBase64 = (base64String: string) => Buffer.from(base64String, 'base64').toString('ascii');
export const toBase64 = (string: string) => Buffer.from(string).toString('base64');

export const fromBase64ToBytes = (base64String: string) => Buffer.from(base64String, 'base64');

export const toBytesNum = (num: any) =>
    num
        .toString()
        .split('')
        .map((d: any) => '3' + d)
        .join('');
export const fromAscii = (hex: any) => Buffer.from(hex).toString('hex');
export const toAscii = (hex: any) => Buffer.from(hex).toString('ascii');
