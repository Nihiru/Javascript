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

function default_binding() {
    console.log('Inside default_binding')
    console.log(this.a)
}
var a = 2;

// default_binding();

// implicit binding
var person = {
    first_name: 'Rick',
    tell: function (person) {
        console.log(' First Name: ' + this.first_name + ' Person: ' + person)
    }
}

/**
 * When there is a context object for a function reference, then implicit binding rule says it's that object that should be used 
 * for the functions call `this` binding
 */
// person.tell('Mark')
// var ob = person.tell
// ob('Mark') // returns - Name: undefined Person: Mark. Look into the function call-site, it is in the global scope
// var first_name = 'Howie'
// ob('Mark')


function greet() {
    console.log(this)
    console.log(`Name: ${this.name}`)
    console.log(`Arguments: ${arguments}`)
}
var person = {
    name: "Trickster"
}

// greet.call(person, 'Does this work?', "Doesn't it?")

// new binding
function foo(lastName) {
    this.firstName = 'Osama';
    this.lastName = lastName
    this.say = function () {
        return " I am " + this.lastName + ', ' + this.firstName
    }
}

var username = {
    'name': 'Ahmed'
}

/**
 * 
 * 1) A brand new object is created out of thin air.
 * 2) The newly constructed object is [[Prototype]] - linked
 * 3) The newly constructed object is set as the this binding for that function call.
 * 4) Unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.
 * 
 */
var result = new foo('Bin Laden')
// console.log(result())

// binding precedence
function call_me(something) {
    this.a = something
}

var obj1 = {
    call_me: call_me
}
var obj2 = {}

// implicit binding
obj1.call_me(2)
// console.log(obj1.a) // 2

// explicit binding
obj1.call_me.call(obj2, 4)
// console.log(obj2.a) // 4

// new binding
var new_bind = new obj1.call_me(6)
// console.log(obj1.a) // 2 
// console.log(new_bind.a) // 6



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


/**
 * 
 * 
 * To implicitly pass an object reference. `this` is used as the context object rather than explict pass of the object itself.
 * 
 */

function identify() {
    return this.name + ' stay true to yourself. '
}

identify.call_me = () => {
    return 'Adding an property to function object'
}

// console.dir(identify.call_me)

function identifyCallingItself() {
    var userAge = 22
    // using funtion identifier as a function object reference when persistence is required between function calls 
    return identifyCallingItself.username + ' stay true to yourself. '
}

identifyCallingItself.username = 'Nikhil'

// console.log(identifyCallingItself())

var obj = {
    name: "Nikhil",
    full_name: 'M, ' + this.name
}

// console.log(obj)

function foo1() {
    this.a = 2
    console.log(this.a)
}

function bar() {
    console.log(this.a)
}

// foo1()

var myObject = {
    // define a getter for `a` 
    get a() {
        return this.a;
    },
    // define a setter for `a`
    set a(val) {
        this.a = val * 2;
    }
};
// myObject.a = 2;

// console.log(myObject)

// myObject.a = 4

// console.log(myObject)


// classes and objects

function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key]
        }
    }
    return targetObj
}

var vehicle = {
    engines: 1,
    iginition: function () {
        console.log("Turning on the engine...")
    },
    drive: function () {
        this.iginition();
        console.log("Steering and moving forward!!!")
    }
}
var car = mixin(vehicle, {
    wheels: 4,
    drive: function () {
        vehicle.drive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!")
    }
})

// console.log(car.drive())

// Implicit Mixins
var Something = {
    cool: function () {
        this.greeting = 'Hello World!';
        this.count = this.count ? this.count + 1 : 1;
    }
}

// console.log(Something.greeting) // undefined
// console.log(Something.cool()) // undefined
// console.log(Something.greeting) // Hello World!
// console.log(Something.count) // 1

var Another = {
    cool: Something.cool
}

// Another.cool()
console.log(Another.greeting)