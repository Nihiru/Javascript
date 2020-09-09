function RepeatedString(s, n){
    var numOfAs = 0
    var repeatedStrings = ''
    if (n >= s.length){
        // repeat strings upto n
        // repeatedStrings = s.padEnd(n, s)  
        let occurrencesOfAs = [...s].filter(e => e === 'a').length;

        /**
         * Math.floor(n/s.length) - is used to find out the number of occurrences of that word in `n` space
         * occurrencesOfAs - is used count the number of `a`s in the entire calculated string of `n` space
         */
        numOfAs = Math.floor(n/s.length) * occurrencesOfAs
    }
    // to find out the substrings that needs to be put so as to be part of `n` space
    let tailStringLength = n % s.length;
    // tailStringLength defines the lenght of the substring from the `s` string
    for(let i=0; i< tailStringLength;i++){
        // finding the number of  `a`s in the substring
        if(s[i]==='a') numOfAs++;
    }
   
    // returning number of As in a given string
    return numOfAs
}

// console.log(RepeatedString('abc', 10))
console.log(RepeatedString('aba', 10))
// console.log(RepeatedString('a', 1000000000000)) // failed for padEnd method