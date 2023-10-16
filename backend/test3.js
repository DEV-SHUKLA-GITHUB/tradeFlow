
// const server=require("http").createServer(app)
const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:7000/instruments'); // Replace 'ws://localhost:3000' with your backend WebSocket URL

        socket.onopen = () => {
          console.log('WebSocket connected');

          const initialData = {
            token: 'your_token',
            instrumentToken: '256265',
            email: 'b@gmail.com',
          };

          socket.send(JSON.stringify(initialData));
        };

        socket.onmessage = (event) => {
          const ticks = JSON.parse(event.data);
          console.log('Received ticks:', ticks);
          // Handle the received tick data in the frontend as per your requirements
        };

        socket.onclose = () => {
          console.log('WebSocket disconnected');
        };