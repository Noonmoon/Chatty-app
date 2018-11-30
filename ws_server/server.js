const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

const PORT = 3003;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  let userCount = {
    type: 'clientCount',
    count: wss.clients.size
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userCount));
    }
  });

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);

    if (message.type === 'postMessage') {
      message.type = 'incomingMessage'
      console.log(`User ${message.username} said ${message.content}`)
    } else if (message.type === 'postNotification') {
      message.type = 'incomingNotification'
      console.log(message.content)
    }

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    })
  });

  ws.on('close', () => {
    console.log('Client disconnected')
    let userCount = {
      type: 'clientCount',
      count: wss.clients.size
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(userCount));
      }
    });
  });
});
