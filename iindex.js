const url = require("url");
const http = require("http");
const fs = require("fs");

http.createServer(function (req, res) {
    var urlreq = url.parse(req.url);
    console.log(urlreq);
    
    fs.readFile("." + urlreq.pathname, function (error, data) {
        console.log(urlreq.pathname);
        if (error) {
            res.writeHead(404, { 'Content-type': 'text/html' });
            return res.end("Page not found");
        } else{
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(data);
            res.end();
        }
    })
}).listen(3020,() => {
    console.log('Server running at 3020');
});