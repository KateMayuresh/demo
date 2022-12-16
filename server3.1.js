//create a server which will respond to/, /about-us, /contact-us
//http://localhost:8888/
//http://localhost:8888/
//http://localhost:8888/
const http = require("http");
const fs = require("fs");
const url = require("url");
const hostName = "127.0.0.1"; //localHost
const port = 5555;

console.log("Preparing server....");

const server = http.createServer((req, res) => {
  console.log("URL:" + req.url);
  var q = url.parse(req.url, true);
  console.log("host:" + q.host); //returns local host
  console.log("pathname:" + q.pathname); //returns default.html
  console.log("search:" + q.search); //returns.....

  if (q.pathname === "/") {
    myReadFile("index.html", res);
  } else if (q.pathname === "/contact-us") {
    myReadFile("contact-us.html", res);
  } else if (q.pathname === "/about-us") {
    myReadFile("about-us.html", res);
  } else if (q.pathname === "/search") {
    let searchData = q.query;
    console.log(JSON.stringify(searchData));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>Search page</h2>You searched for :" + searchData.topic);
    return res.end();
  } else {
    myReadFile("index.html", res);
  }
});

function myReadFile(fileName, res) {
  fs.readFile(fileName, function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
}

server.listen(port, hostName, () => {
  console.log("server is running at " + hostName + "port : " + port);
});
