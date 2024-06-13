import crypto from 'crypto';

function generateSecret(length) {
  return crypto.randomBytes(length).toString('hex');
}

const secret = generateSecret(32); // 32 bytes = 64 characters in hexadecimal
console.log(`Your JWT secret: ${secret}`);
