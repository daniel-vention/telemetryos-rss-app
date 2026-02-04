import { configure, store } from '@telemetryos/sdk'

// Configure SDK - REQUIRED for workers to function
configure('telemetryos-rss-app')

/**
 * Background worker that generates a random string every 10 seconds
 * and stores it in instance storage.
 */
function generateRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = 12
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function updateRandomString() {
  console.log('updateRandomString called')
  const randomString = generateRandomString()
  await store().instance.set('randomString', randomString)
  console.log('Random string updated:', randomString)
}

// Generate initial random string immediately
updateRandomString()

// Set up interval to generate new random string every 10 seconds
setInterval(updateRandomString, 10000)

console.log('Worker initialized and running')