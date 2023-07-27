var express = require("express");
var app = express();
var mysql = require("mysql");
// cores used to prevent the cores issues
var cores = require("cors");
//Authentication
var jwt = require("jsonwebtoken");
//body parser in important for posting the datas
var bodyParser = require('body-parser')

    //password encoded
        // const bcrypt = require('bcrypt');
        // const util = require('util');

const HashPassword = require("./password").HashPassword
const verifyHashPassword = require("./password").verifyHashPassword

// middleware inside call cores ,we add connect any domin.
app.use(cores());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//<-----------------------------------------------------DataBase Connection------------------------------------------->
var conect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "DemoNode"
});

conect.connect((error) => {
    if (error) throw error;
    console.log("Connected Successfully!!");
});

app.get("/", (req, res) => {
    res.send("<h1>Hello Server</h1>")
});

// <-----------------------------------------Tocken Generation -------------------------------------------->

// <----------------------------------------Sign up (new)---------------------------------------->

app.post("/signup", (req, res) => {
    let user_name = req.body.user_name;
    let password = req.body.password;
    let hashedPassword = HashPassword(password);
    console.log("hashedPassword===", hashedPassword, "==")
    let signup = `INSERT INTO Login (user_name, password,salt) VALUES('${user_name}','${hashedPassword.hash}','${hashedPassword.salt}');`
    conect.query(signup, (err, result) => {
        if (err) {
            res.status(500).send({ error: "sign Up Failed !!" });
        } else {
            res.status(200).send({ success: "Sign Up Success" });
        }
    })
});

// <-------------------------------------------------------Login (new)-------------------------------------------->

app.post("/login", (req, res) => {
    
        let user_name = req.body.user_name;
    let password = req.body.password;
    if (!user_name || !password) {
        res.status(400).send({ error: "username or password con't be empty" });
    }
        let loginQuery = `SELECT password, salt FROM Login WHERE user_name='${user_name}';`;
        conect.query(loginQuery, (err, result) => {
            if (err) {
                console.log(err,"errorrrr");
                res.status(500).send({ error: "Authentication Failed" });
                
            } else {
                if (result.length === 0) {
                    console.log(result,"result2");
                    
                    res.status(401).send({ error: "User not found" });
                } else {
                    console.log(JSON.stringify(result[0]))
                    
                    const hashedPasswordFromDB = result[0].password;
                    const salt = result[0].salt;
                    const passwordsMatch = verifyHashPassword(password, salt);
                    if (hashedPasswordFromDB === passwordsMatch.hash) {
                        let resp = {
                            id: result[0].id,
                            user_name :result[0].user_name
                        }
                        let token = jwt.sign(resp, "secret", { expiresIn: 86400 });
                        res.status(200).send({ auth: true, token: token, success: "Login Successful"});
                        // res.status(200).send({ success: "Login Successful" });
                    } else {
                        res.status(401).send({ error: "Incorrect password" });
                    }
                }
            }
        });
});


// <------------------------------------------------------Sign up(old)--------------------------------------------------->
// const genSalt = util.promisify(bcrypt.genSalt);
// const hash = util.promisify(bcrypt.hash);

// async function hashPassword(password) {
//     try {
//         const saltRounds = 10;
//         const salt = await genSalt(saltRounds);
//         const hashedPassword = await hash(password, salt);
//         return hashedPassword;
//     } catch (err) {
//         throw err;
//     }
// }
// app.post("/lgn", async (req, res) => {
//     if (req.body.user_name === undefined || req.body.password === undefined) {
//         res.status(500).send({ error: "Authentication Failed" });
//     }
//     let user_name = req.body.user_name;
//     let password = req.body.password;
//     let hashedPassword = await hashPassword(password);
//     let lgn_post = `INSERT INTO Login (user_name, password) VALUES('${user_name}','${hashedPassword}');`
//     conect.query(lgn_post, (err, result) => {
//         if (err) {
//             res.status(500).send({ error: "Login Failed !!" });
//         } else {
//             res.status(200).send({ success: "Login Success" });
//         }
//     })
// });


// <-----------------------------------------college List------------------------------------------>

app.get("/clg", (req, res) => {
    const list = "select * from Collages;"
    conect.query(list, (err, result, feilds) => {
        if (err) throw err;
        res.send(result);
    })
});

// <------------------------------------------college by id--------------------------------------------->

app.get("/clg/:clg_id", (req, res) => {
    let id = req.params.clg_id;
    const list = "select * from Collages where clg_id =";
    conect.query(list + id, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

// <-----------------------------------------------add a college-------------------------------------------->

app.post("/clg", (req, res) => {
    let clg_name = req.body.clg_name;
    let state = req.body.state;
    let clg_code = req.body.clg_code;
    let add = `insert into Collages(clg_name,state,clg_code) values('${clg_name}','${state}','${clg_code}');`;
    conect.query(add, (err, result) => {
        if (err) {
            res.send({ error: "operation failed" });
        } else {
            res.send({ success: "Operation Success" });
        }
    })
});

// <-----------------------------------------------edit college details------------------------------------------->

app.patch("/clg", (req, res) => {
    let clg_id = req.body.clg_id;
    let clg_name = req.body.clg_name;
    let state = req.body.state;
    let clg_code = req.body.clg_code;
    const edit = `update Collages set clg_name ='${clg_name}',state='${state}',clg_code = '${clg_code}' where clg_id = '${clg_id}';`;
    conect.query(edit, (err, result) => {
        if (err) {
            res.send({ error: "Update operation failed" });
        } else {
            res.send({ success: "Update Operation Success" });
        }
    })
});

// <---------------------------------------------------Delete collage------------------------------------------------>

app.delete("/clg/:clg_id", (req, res) => {
    let clg_id = req.params.clg_id;
    const clg_delete = `delete from Collages where clg_id='${clg_id}';`;
    conect.query(clg_delete, (err, result) => {
        if (err) {
            res.send({ error: "Delete operation failed" });
        } else {
            res.send({ success: "Delete Operation Success" });
        }
    })
})

// <------------------------------------------------------------------------------------------------------>
app.listen(9000, () => {
    console.log("Server Started !!")
});

