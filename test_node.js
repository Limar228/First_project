const http = require('http'); // this use when need. func(){http = require('http')}
const fs = require('fs');

let server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); //text/html. WHAT IS THAT

  if (req.url === '/') {
    // also learn url and i maked url in the index on the form
    fs.createReadStream('./index.html').pipe(res); //learn stream
  } else if (req.url === '/about') {
    fs.createReadStream('./registration.html').pipe(res);
  } else {
    //here "ВЫ ПЕРЕШЛИ НА НЕПРАВИЛЬНУЮ СТРАНИЦУ"
  }
});

const PORT = 8080;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен: http://${HOST}:${PORT}`);
});
