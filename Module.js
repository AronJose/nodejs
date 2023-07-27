const hello = function()  {
    console.log("hello")
}
module.exports=hello;


const hei = {
    name: "aron",
    age: 25,
    greet: function () {
        console.log("hello" + this.name +"your age is " +this.age)
    }
}
module.exports = hei;
