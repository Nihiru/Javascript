/**
 * Two arrays should match the same frequency where the first array would consists of random number and the second array should have the corresponding\
 * squares of that number
 * ([1,2,3]) 
 *  :satisfies F(n) where F(n) is Frequency function which takes array input and gives squares of the input array
 *  :([1,9,4])
 *  :Order is not important
 *  :Frequecny of both the array should match
 */

 function same(arr1, arr2){ 
    if (arr1.length  !== arr2.length){
        return false
    }
    for(let i=0;i<arr1.length; i++){
        // check for the index of the square of ith number in  arr2
        let correctIndex = arr2.indexOf(arr1[i] ** 2);
        if(correctIndex === -1){
            return false;
        }
        // if found remove it 
        arr2.splice(correctIndex, 1)
    }
    return true
 }
 console.log(same([1,2,3], [1,4,9]))
 console.log(same([5,1,2], [4,1,25]))
 console.log(same([1,2,3,6], [9]))