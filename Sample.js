// console.log(__filename);
// console.log(__dirname);

// // if we can add a file on the same path join used to add 
// const path = require("path");
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.dirname(__filename));


// // "api" it is the new name and old name file
// console.log(path.join(__dirname, "api", "Sample.js"));

// // fs --> File System 
// // fs --> it is maininly used to create ,update,delete of a files.
// const fs = require("fs");
// //create a file using fs and path
// fs.mkdir(path.join(__dirname, "/api"), {}, (err) => {
//     if (err) throw err;
// });

// // add new file inside the file
// fs.mkdir(path.join(__dirname, "/api/newapi"), {}, (err) => {
//     if (err) throw err;
// });

// //add a file inside the same folder
// fs.mkdir(path.join(__dirname, "/api/newapi/aron.html"), {}, (err) => {
//     if (err) throw err;
// });

// // delete the file 
// fs.rmdir(path.join(__dirname, "/api"), {recursive:true}, (err) => {
//     if (err) throw err;
// });

// // create a folder and to write a contents on that file 
// fs.writeFile(path.join(__dirname, "/api","api.text"), "UserName : Aron Jose", (err) => {
//     if (err) throw err;
// });

// // or

// const user = "Aron Jose";
// fs.writeFile(path.join(__dirname, "/api", "api.text"), `UserName :${user}`, (err) => {
//     if (err) throw err;
// });

// // or (append a File)

// const user = "Amod Jose";
// fs.appendFile(path.join(__dirname, "/api", "api.text"), `\n UserName :${user}`, (err) => {
//     if (err) throw err;
// });

// // read a file ,"utf8 --> character read cheyan ann "

// fs.readFile(path.join(__dirname, "/api", "api.text"), "utf8", (err,data) => {
//     if (err) throw err;
//     console.log(data)
// });


//call back

const hello = (data) => {
    console.log("data :" + data)
};
const hey = (callback) => {
    callback("hellow how are you?")
};
hey(hello);