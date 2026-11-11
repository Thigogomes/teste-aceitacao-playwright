// Servidor estático mínimo: serve o index.html em http://127.0.0.1:5173
const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
  })
  .listen(5173, '127.0.0.1', () => console.log('App em http://127.0.0.1:5173'));
