function RepeatedString(s, n){
    var numOfAs = 0
    var repeatedStrings = ''
    if (n >= s.length){
        // repeat strings upto n
        // repeatedStrings = s.padEnd(n, s)  
        let occurrencesOfAs = [...s].filter(e => e === 'a').length;
        numOfAs = Math.floor(n/s.length) * occurrencesOfAs
    }
    let tailStringLength = n % s.length;
    for(let i=0; i< tailStringLength;i++){
        if(s[i]==='a') numOfAs++;
    }
   
    // returning number of As in a given string
    return numOfAs
}

// console.log(RepeatedString('abc', 10))
// console.log(RepeatedString('aba', 10))
console.log(RepeatedString('a', 1000000000000)) // failed for padEnd method