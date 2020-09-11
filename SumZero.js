/**
 * 
 * @param {Array} arr - Sorted array to find a pair that returns 0 when added
 */

function sum_zero(arr){
    for(let i=0;i< arr.length;i++){
        for(let j=i+1;j<arr.length;j++){
            if(arr[i] + arr[j] == 0){
                return [arr[i], arr[j]]
            }
        }
    }
    return "No pair found"
}

console.log(sum_zero([-3, -2, -1, 0, 1, 2, 3]))
console.log(sum_zero(-1,0,1,2,3,4,5))