const { createClient } = require("redis");

const client = createClient();

client.on('connect', () => console.log('established connection'));
client.on('err', (err) => console.log(`redis error: ${err.message}`));
client.on('ready', () => console.log('established connection and ready to use'));
client.on('end', () => console.log('redis was shut down'));

module.exports = {
    redisClient: client 
}