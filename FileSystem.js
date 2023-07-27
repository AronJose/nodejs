const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    fs.readFile("FileSystem.html", function (error, data) {
        const resBody = error ? "Unknown File" : data;

        response.write(resBody);
        response.end();
    });
}).listen(3030);