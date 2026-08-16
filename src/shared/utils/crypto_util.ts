import crypto from 'crypto';

export function generateRandomString(length: number): string {

    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    const charsLength = allowedChars.length;

    const randomValues = new Uint32Array(length);

    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        result += allowedChars[randomValues[i]! % charsLength];
    }

    return result;
}