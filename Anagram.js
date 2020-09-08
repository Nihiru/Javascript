/**
 * function to find anagrams of two strings using frequency counter pattern
 */

function findAnagrams(first, second){
    if(first.length !== second.length){
        return false
    }
    let firstAnagramObject = {}
    let secondAnagramObject = {}
    // hash ===> key as the character in the string and value as the number of times of occurrences of the respective character 
    for(let i=0;i<first.length; i++){
        let letter = first[i]
        firstAnagramObject[letter] ? firstAnagramObject[letter]++ : firstAnagramObject[letter] = 1
    }

    for(let i=0;i<second.length; i++){
        let letter = second[i]
        secondAnagramObject[letter] ? secondAnagramObject[letter]++ : secondAnagramObject[letter] = 1
    }
    
    for(let char in firstAnagramObject){
        // check if the character exists in the second string
        if(!(char in secondAnagramObject)){
            return false
        }
        // check for the count of occurrences of each characters in the second anagram
        if(firstAnagramObject[char] !== secondAnagramObject[char]){
            return false
        }
    }
    return true
}

// console.log(findAnagrams("anagram", "nagaram"))
// console.log(findAnagrams("aaz", "zza"))

// procedure 2
function validAanagrams(first, second){
    if(first.length !== second.length){
        return false
    }
    const lookup = {}

    for(let i=0; i< first.length; i++){
        let letter = first[i];
        lookup[letter] ? lookup[letter]++ : lookup[letter] = 1
    }

    for(let i=0;i<second.length; i++){
        let letter = second[i]
        // this condition looks up for `letter` in `lookup` and checks the value for true/false 
        if(!lookup[letter]){
            return false
        } else {
            // count decreases for each character found 
            lookup[letter] -= 1
        }
    }
    return true
}

console.log(validAanagrams("anagram","nagram"))
console.log(validAanagrams("anagram","nagara"))