// let a = 10;
// {
//     let a = 100;
//     console.log(a);
//     {
//         const c = 1000
//         console.log(b);
//         {
//             console.log(c);
//         }
//     }
// }
// console.log(a)

// let hello = () => {
//     var b = 20;
//     console.log(a)
// }

// function outer(){
//     var a = 10;
//     function inner(){
//         // It is possible to access a as clousres encloses local function and its lexical environment
//         console.log(a)
//     }
//     return inner
// }
/**
 * Since execution context will be removed after performing its operation and the references it hold wouldn't be available.
 * This is where closures come into picture and it allows to access those values via references. 
 * 
 */
// var ref = outer()
// console.log(ref)
// ref()

// function external_function(){
//     console.log(10)
// }
// function x(func_ref){
//     var a = 10;
//     return func_ref
// }
// var z = x(external_function);
// console.log(z)
// z()

// function closure_examples() {
//     for(var i=1; i<=5;i++){
//         setTimeout(function(){
//             console.log(i)
//         })
//     }
// }
// closure_examples()

/**
 * Block scopes
 * 1) Creates a block of execution where a statement is expected for a `for` loop. In place of a statement we add a block of statements.
 * 2) variables of type `var` are globally allocated whereas `let` variables or block scoped
 * 3) Each time loop is triggered it creates a new block
 * 4) Based on the variable type the lexical environment points to references of its outer scope
 * 
 */
// // here outerscope has references of type `var`
// for(var i=0;i<5;i++){
//     setTimeout(function(){
//         console.log(i)
//         // would print 6 6 6 6 6 due to variable type
//     }, i * 1000)
// }

// // here outerscope has references of type `let` and `let` automatically creates a new block for each iteration
// for(let i=0; i<5; i++){
//     setTimeout(function(){
//         console.log(i)
//         // prints 1 2 3 4 5 
//     }, i * 1000)
// }

// // closures
// for(var i=0;i<5;i++){
//     function close(x){
//         setTimeout(function(){
//             console.log(i)
//             // prints 1 2 3 4 5 
//         }, x * 1000)
//     }
//     close(i)
// }


// function outest(){
// statements enclosed within the function provide data protection
//     var c = 20;
//     function outer(b){
//         function inner(){
//             console.log(a,b,c)
//         }
//         let a = 10;
//         return inner;
//     }
//     return outer;
// }

// var x = (outest())("hellowworld")
// x()



// function outer(){
//     var c = 10
//     let d = 200
//     console.log(c)
//     function inner(){
//         console.log(d)
//     }
//     return inner
// }

// var temp = outer()
// console.log(temp())

// recreating a map function
// function double(x) {
//     return x * 2;
// }

// Array.prototype.calculate = (func) => {
//     const output = [];
//     for (let i = 0; i < this.length; i++) {
//         output.push(func(this[i]));
//     }
//     return output
// }
// array = [1, 2, 3, 4, 5]
// console.log(array.calculate(double))


// var data = [{
//         "first_name": "nikhil",
//         "last_name": "M",
//         "age": 26
//     },
//     {
//         "first_name": "bharath",
//         "last_name": "k",
//         "age": 75
//     },
//     {
//         "first_name": "bogar",
//         "last_name": "sithar",
//         "age": 50
//     },
//     {
//         "first_name": "kalanginathar",
//         "last_name": "sithgar",
//         "age": 26
//     },
// ]

// const output = data.reduce(function (acc, curr) {
//     if (curr["age"] == 26) {
//         acc.push(curr["first_name"])
//     }
//     return acc
// }, [])

// console.log(output)

/**
 * this
 */
// default binding
// var a = 2;

// var default_binding = () => {
//     var a = 1;
//     console.log(this.a)
// }
// default_binding();

// implicit binding
// var person = {
//     name: 'Rick',
//     tell: function (person) {
//         console.log(' Name: ' + this.name + ' Person: ' + person)
//     }
// }

// person.tell('Mark')
// var ob = person.tell
// ob('Mark')


// function greet() {
//     console.log(this)
//     console.log(`Name: ${this.name}`)
//     console.log(`Arguments: ${arguments}`)
// }
// var person = {
//     name: "Trickster"
// }

// greet.call(person, 'Does this work?', "Doesn't it?")

// new binding
// function foo() {
//     this.name = 'Osama';
//     this.say = function () {
//         return " I am " + `${this.name}`
//     }
// }

// var username = {
//     'name': 'Ahmed'
// }
// var result = new foo()
// console.log(result())

var first_name = 'Kartik'
var last_name = 'S'
var person = {
    first_name: "Nikhil",
    last_name: "M",
    withoutthis: () => {
        console.log(person.last_name + ', ' + person.first_name)
    },
    withthisAnonymousFunction: function () {
        console.log(this.last_name + ', ' + this.first_name)
    },
    withthisFunctionExpression: () => {
        console.log(this.last_name + ', ' + this.first_name)
    }
}
// person.withoutthis() // M, Nikhil
// person.withthisAnonymousFunction() // M, Nikhil
// person.withthisFunctionExpression() // undefined, undefined