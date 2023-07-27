const http = require('http');
const Todo = require("./controllers");
const { getReqData } = require("./utiles");

http.createServer(async (req, res) => {
    // res.write("<h1>This is Node.js....!</h1>");
    console.log(req.url);

    // /api/todos : GET
    if (req.url === "/api/todos" && req.method === "GET") {
        try {
            const todos = await Todo.getTodos();
            res.end(JSON.stringify(todos));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Error fetching todos" }));
        }
    }
    // /api/todos/id : GET by id
    if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const todo = await Todo.getTodo(id);
            res.end(JSON.stringify(todo));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Error fetching todos" }));
        }
    }
    else {
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}).listen(3001, () => console.log("Server is running"));