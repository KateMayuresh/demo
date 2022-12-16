//create a server which will respond to/, /about-us, /contact-us
//http://localhost:8888/
//http://localhost:8888/
//http://localhost:8888/
const http = require("http");
const fs = require("fs");
const url = require("url");
const hostName = "127.0.0.1"; //localHost
const port = 8888;

console.log("Preparing server....");

const server = http.createServer((req, res) => {
  console.log("URL:" + req.url);
  var q = url.parse(req.url, true);
  console.log("host:" + q.host); //returns local host
  console.log("pathname:" + q.pathname); //returns default.html
  console.log("search:" + q.search); //returns.....

  let fileName = "index.html";
  if (q.pathname === "/") {
    fileName = "index.html";
  } else if (q.pathname === "/contact-us") {
    fileName = "contact-us.html";
  } else if (q.pathname === "/about-us") {
    fileName = "about-us.html";
  }

  fs.readFile(fileName, function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(port, hostName, () => {
  console.log("server is running at " + hostName + "port:" + port);
});
