var http = require("http")

http.createServer(function (req, res) {
    res.write("<h1>hello</h1>");
    res.end();
}).listen(3000);
