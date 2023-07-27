var express = require("express");
var bodyParser = require("body-parser");
var express = express();
express.listen(3040, () => {
    console.log('Server running at 3040')
});

//middleware (first value enter in here)
express.use(bodyParser.urlencoded({ extended: false }))
express.use(bodyParser.json())


express.get("/", function (req, res) {
    res.send();
});
express.get("/home", function (req, res) {
    console.log(req.method);
    console.log(req.url);
    res.send(req.query)
});
express.post("/login", (req, res) => {
    res.send(req.body)
});


var profiles = {
    "1": { name: "Aron", age: 25 },
    "2": { name: "Amod", age: 20 },
    "3": { name: "Adarsh", age: 27 },
    "4": { name: "Jose", age: 60 },
    "5": { name: "Lissamma", age: 58 }
}
express.get("/profile/:id", (req, res) => {
    var current_id = req.params.id;
    var current_profile = profiles[current_id];
    if (current_profile) {
        res.send(current_profile) 
    } else {
        res.status(404).send("Page Not Found!!")
    }
})
express.get("/profile", (req, res) => {
    res.send(profiles);
})
