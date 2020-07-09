// Promise constructor takes two parameters resovle() and reject()
const wait = (time) =>
  new Promise((resolve, reject) => setTimeout(resolve, time)); // resolve is called here after 3s
wait(3000);
console.log(wait);
