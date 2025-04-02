// const express = require('express');
// const redis = require('redis');
// const app = express();

// //Provide DNS name/IP address and port
// const client = redis.createClient({
//   host: 'localhost',
//   port: 6379
// });

// app.get('/', (req, res) => {

//   //Read key from the database
//   client.get('visitors', (err, visitors) => {

//     //Convert the value into integer
//     var currVisits = parseInt(visitors);

//     //If visitors is not present in database then initilize 1
//     if(isNaN(currVisits)) {
//       currVisits = 1;
//     }

//     //Send the response back to the user
//     res.send('You are visitor: ' + currVisits);

//     //Increment and save the new value to the database
//     client.set('visitors', currVisits + 1);
//   });

// });

// app.listen(9999, () => {
//   console.log('visitorsapp started on port 9999');
// });

const express = require('express');
const { createClient } = require('redis'); // Use new Redis import
const app = express();

// Create a Redis client
const client = createClient({
  socket: {
    host: 'my-redis-server',
    port: 6379,
  }
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect to Redis
async function connectRedis() {
  await client.connect();
  console.log('Connected to Redis');
}
connectRedis(); // Call the async function to connect

app.get('/', async (req, res) => {
  try {
    // Read key from Redis database
    let visitors = await client.get('visitors');
    
    // Convert the value into an integer
    let currVisits = parseInt(visitors) || 1;

    // Send the response back to the user
    res.send('hi bharath kumar ,  visitor: ' + currVisits);

    // Increment and save the new value to the database
    await client.set('visitors', currVisits + 1);
  } catch (error) {
    console.error('Error interacting with Redis:', error);
    res.status(500).send('Redis error');
  }
});

app.listen(9999, () => {
  console.log('visitorsapp started on port 9999');
});
