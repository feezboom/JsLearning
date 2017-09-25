
var test = function () {
    console.log("Hello, world!");
    // alert("hello, world")
};

var animal = {
    eats: true
};

var rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

console.log(animal.eats);
console.log(rabbit.eats);