// finding a sum of n numbers
// traditional method
function addUptoN(n){
  var total = 0
  for(var i=1;i<=n;i++){
    total +=i
  }
  return total
}

// clever method
function optimizedAddUptoN(n){
  return n * (n +1) /2
}


var t1 = performance.now()
optimizedAddUptoN(1000000000)
var t2 = performance.now()
console.log(`Time taken ${(t2 -t1)/100000} seconds`)


