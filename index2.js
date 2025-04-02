// #simple index2.js
// version: '3.8'

// services:
//   redis:
//     image: redis:latest
//     container_name: my-redis-server
//     restart: always
//     ports:
//       - "6379:6379"
//     networks:
//       - visitor-network

//   visitor-app:
//     build: .
//     container_name: visitor-app
//     restart: always
//     ports:
//       - "9999:9999"
//     depends_on:
//       - redis
//     networks:
//       - visitor-network
//     environment:
//       - REDIS_HOST=redis
//       - REDIS_PORT=6379

// networks:
//   visitor-network:
//     driver: bridge

// {
//     "name": "docker-vistitor-app",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1",
//          "start": "node index.js"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "express": "^5.1.0",
//       "redis": "^4.7.0"
//     }
//   }
  // after moving index.js file to src/index.js
// {
//     "name": "docker-vistitor-app",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1",
//          "start": "node src/index.js"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "express": "^5.1.0",
//       "redis": "^4.7.0"
//     }
//   }
  

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
  
//   const express = require('express');
//   const { createClient } = require('redis'); // Use new Redis import
//   const app = express();
  
//   // Create a Redis client
//   const client = createClient({
//     socket: {
//       host: 'my-redis-server',
//       port: 6379,
//     }
//   });
  
//   // Handle Redis connection errors
//   client.on('error', (err) => {
//     console.error('Redis Client Error', err);
//   });
  
//   // Connect to Redis
//   async function connectRedis() {
//     await client.connect();
//     console.log('Connected to Redis');
//   }
//   connectRedis(); // Call the async function to connect
  
//   app.get('/', async (req, res) => {
//     try {
//       // Read key from Redis database
//       let visitors = await client.get('visitors');
      
//       // Convert the value into an integer
//       let currVisits = parseInt(visitors) || 1;
  
//       // Send the response back to the user
//       res.send('hi bharath,  visitor: ' + currVisits);
  
//       // Increment and save the new value to the database
//       await client.set('visitors', currVisits + 1);
//     } catch (error) {
//       console.error('Error interacting with Redis:', error);
//       res.status(500).send('Redis error');
//     }
//   });
  
//   app.listen(9999, () => {
//     console.log('visitorsapp started on port 9999');
//   });
  
// volumes for faster development (we specified the where the data is going to store) file,folder
// code1: after migrating redis version latest (redis) to redis:6.0-rc we need to down the server first (we specified the where the data is going to store)
// // to make the data persistant even after migration then we need add or specify volumes where redis data are store in the container and then rebuild

// version: '3.8'

// services:
//   my-redis-server:
//     image: redis:6.0-rc
//     expose:
//       - '6379'
//     volumes:
//       - ./redis-data:/data

//   visitor-app:
//     build:
//       context: ./
//       dockerfile: Dockerfile
//     ports:
//       - '9999:9999'
//     depends_on:
//       - my-redis-server
//     volumes:
//       - ./src:/usr/visitorapp/src

// code2: even after downgrading the redis server, data is not lost because of volume(we specified the where the data is going to store)
// version: '3.8'
// 
// services:
//   my-redis-server:
//     image: redis
//     expose:
//       - '6379'
//     volumes:
//       - ./redis-data:/data

//   visitor-app:
//     build:
//       context: ./
//       dockerfile: Dockerfile
//     ports:
//       - '9999:9999'
//     depends_on:
//       - my-redis-server
//     volumes:
//       - ./src:/usr/visitorapp/src
