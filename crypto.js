import crypto from 'crypto'

export function generateHash(secret) {
  const timestamp = new Date().toISOString().substr(0, 19).replace('T', ' ')
  const data = timestamp + secret
  const hash = crypto.createHash('sha256').update(data).digest('hex')
  return {
    timestamp: timestamp,
    hash: hash,
  }
}

