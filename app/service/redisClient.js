const { createClient } = require('redis');

// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

module.exports = redisClient;