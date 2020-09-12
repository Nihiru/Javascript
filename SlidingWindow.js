/**
 * 
 * @param {Array} arr - The array from which the sum needs to be calculated 
 * @param {Integer} n - Maximum sum of `n` consecutive elements in the array
 */
function maxSubArraySum(arr, n){
    if (num > arr.length){
        return null
    }

    var max = -Infinity;
    // start from first and end upto a moment where adding current index with `n` would point to the last index in the array
    for(let i=0;i<arr.length - num + 1;i++){
        temp = 0;
        // loop only through 4 items from current index position `i`
        for(let j=0;j<num ;j++){
            temp +=arr[i+j]
        }
        // find the maximum for each set of 4 added numbers
        if(temp> max){
            max= temp
        }
    }
    return max
}
