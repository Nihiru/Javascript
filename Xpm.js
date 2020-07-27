// Promise constructor takes two parameters resovle() and reject()
const wait = (time) =>
	new Promise((resolve, reject) => setTimeout(resolve, time)); // resolve is called here after 3s
wait(3000);
console.log(wait);


// Example 2
function tossASix(){
	return new Promise((fulfill,reject) => {
		var n = Math.floor(Math.random() * 6) + 1
		if (n === 6){
			fulfill(6)
		} else {
			reject(n)
		}
	}) 
}

function logAndTossAgain(toss){
	console.log("Tossed a " + toss + ", need to try again")
	return tossASix() // returns a promise if a 6 wasn't tossed
}

function logSuccess(toss){
	console.log("Yay, managed to toss a " + toss)
}

function logFailure(toss){
	console.log("Tossed a ", + toss  +  ". Too bad, couldn't roll a six ")
}

// tossASix()
/**
 * .then(fullfill[,Reject])
 * 		:It accepts arguments as function object. If it is a function, it is internally replaced with an 
		  identity fulfillment
		:Based on Promise the respective handler function will be called asynchronously
		:It returns a promise which allows for method chaining
		:Code in the handlers gets executed asynchronously, with a fresh stack
		:Maybe it unwraps the object passed from promise when called for action
		
 */
// .then(null, logAndTossAgain)
// .then(null, logAndTossAgain)
// .then(logSuccess, logFailure)


// Example 3
var tossTable = {
	1:'one',
	2:'twp',
	3:'three',
	4:'four',
	5:'five'
}

function toss(){
	return new Promise(function(fulfill, reject){
		var n = Math.floor(Math.random() * 6) +1
		fulfill(n)
	})
}

function logAndToss(toss){
	var tossWord = tossTable[toss]
	console.log("Tossed a " + tossWord.toUppercase()+ ".")
}

function logErrorMessage(error){
	console.log("OOPS: " + error.message)
}
toss()
.then(logAndToss)
.then(logAndToss)
.then(logAndToss)
.then(null, logErrorMessage) // required rejectionHandlers when error situations occurs.