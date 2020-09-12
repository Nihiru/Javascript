/**
 * @param {Array} arr - Sorted array to find a pair that returns 0 when added
 */

function sum_zero(arr){
    /**
     * Time complexity - O(n^2) 
     * Space complexity - O(1)
     *  */ 

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

/**
 * Usage of two pointers 
 * @param {Array} arr - Sorted array to find a pair and return 0 when added
 */

function sum_zero_refactor(arr){
    /**
     * Time complexity - O(n)
     * space complexity - O(1)
     */
    let left = 0;
    let right = arr.length - 1;
    while(left < right){
        let sum = arr[left] + arr[right]
        if(sum === 0)
            return [arr[left], arr[right]];
        else if(sum > 0)
            right--;
        else
            left++;
    }
    return "No Pair found"
}

console.log(sum_zero_refactor([-3,-2,-1,0,1,4]))


function uniqueElements(arr){
    let left = 0;
    let right = 0;
    if(arr.length == 0){
        return 0;
    }
    let countOfUniqueELements = 1
    while(left < arr.length && right !== arr.length){
        if(arr[left]  === arr[right]){
            right++;
        } else{
            left = right;
            countOfUniqueELements++
        }
    }
    return countOfUniqueELements 
} 

console.log(uniqueElements([1,1,1,2,2,3,3,4]))
console.log(uniqueElements([1,1,1,1,1,1,1]))
console.log(uniqueElements([]))