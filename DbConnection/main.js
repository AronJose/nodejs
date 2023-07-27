const http = require('http');

const Todo = require("./controller");
const { getReqData } = require("./utils");

http.createServer(async (req, res) => {
    // /api/todos : GET
    if (req.url === "/api/todos" && req.method === "GET") {
        try {
            console.log("hueeee");
            
            const todoes = await Todo.getTodos();
            console.log("rrrr", todoes);
            
            res.end(JSON.stringify(todoes));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Error fetching todos" }));
        }
    }
    // /api/todos/id : GET by id
    // if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    //     try {
    //         const id = req.url.split("/")[3];
    //         const todo = await Todo.getTodo(id);
    //         res.end(JSON.stringify(todo));
    //     } catch (error) {
    //         res.writeHead(500, { "Content-Type": "application/json" });
    //         res.end(JSON.stringify({ message: "Error fetching todos" }));
    //     }
    // }
    else {
        res.end(JSON.stringify({ message: "Route not found !!" }));
        // console.log("heeeeee",res)
    }
}).listen(3001, () => console.log("Server is running"));