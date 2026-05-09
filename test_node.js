const http = require('http'); // this use when need. func(){http = require('http')}
const fs = require('fs');
require('dotenv').config();

let server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); //text/html. WHAT IS THAT

  res.end('dasd');
});

const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1';
console.log(process.env.PORT);

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен: http://${HOST}:${PORT}`);
});
