/**
 * Write a program to see how process states change as programs runs on a single CPU.
 * -- adding two instructions
 * -- adding an I/O operation and checking the difference
 *  * */
import proc from 'process'
function add_number(...args) {
    // printing out the process information
    return args.reduce((prev, curr) => { return prev + curr })

}

another_Obj = {
    "Cities": ["Bangalore", "Mumbai"]
}

add_number(1, 2, 3, 4, another_Obj)