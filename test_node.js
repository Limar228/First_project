const http = require('http'); // this use when need. func(){http = require('http')}
const fs = require('fs');

let server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); //text/html. WHAT IS THAT

  res.end('dasd');
});

const PORT = 8080;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен: http://${HOST}:${PORT}`);
});
