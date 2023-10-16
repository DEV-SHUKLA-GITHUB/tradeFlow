const KiteConnect = require("kiteconnect").KiteConnect;
// const WebSocket=require("./websockets")
// const http = require('http');
// const httpServer = http.createServer();
const WebSocket = require('ws');


// const { io } = require("socket.io-client");
// const io = require('socket.io')(httpServer);

// const api_key="elrfps73mpn9aou4"

const fs = require('fs');

// Read the file contents
fs.readFile('./auth/zerodha_access_token.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  var KiteTicker = require("kiteconnect").KiteTicker;
  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Extract the access token
    const {access_token, api_key} = jsonData;

          const a=async ()=>{
            var ticker = new KiteTicker({api_key, access_token});
            function onTicks(ticks) {
              console.log("Ticks", ticks);
          }
          
          function subscribe() {
              var items = [256265];
              ticker.subscribe(items);
              ticker.setMode(ticker.modeQuote, items);
          }
        
            ticker.connect();
            ticker.on("connect", subscribe);
            ticker.on("ticks", onTicks);
            ticker.connect();
            
            ticker.on("connect", subscribe);
            ticker.on("ticks", onTicks);
  }
  a()
} catch (error) {
  console.error('Error parsing JSON:', error);
}
});


