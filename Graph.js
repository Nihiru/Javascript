// function graph(v){
//     this.vertices = v
//     this.edges = 0
//     this.adj = []
//     for(var i=0 ; i<this.vertices ;i++){
//         this.adj[i] = []
//         this.adj[i].push("")
//     }

//     this.addEdge = addEdge
//     this.showGraph = showGraph
//     this.dfs = dfs
//     this.marked = []
//     for(var i=0; i < this.vertices;i++){
//         this.marked[i] = false
//     }

// }

// function addEdge(source, destination){
//     this.adj[source].push(destination);
//     this.adj[destination].push(source)
//     this.edges++
// }

// function showGraph(){
//     for(var i=0; i<this.vertices ; i++){
//         console.log(i + " " + "->")
//         for(var j=0 ;j< this.vertices;j++)
//         if(this.adj[i][j] != undefined)
//             console.log(this.adj[i][j]+ " ")
//     }

// }

// function dfs(v){
//     this.marked[v] = true
//     if(this.adj[v] != undefined)
//         console.log("Visited Vertex : " + v)
//     this.adj.forEach(element => {
//         if(! this.marked[element])
//             this.dfs(element)
//     });

// }

// let g = new graph(5)
// g.addEdge(0, 1)
// g.addEdge(0, 2)
// g.addEdge(1, 3)
// g.addEdge(2, 4)
// g.showGraph();
// g.dfs(0);


// code.tutsplus.com
function Node(data){
    this.data = data
    this.parent = null
    this.children = []
}

function Tree(data){
    var node = new Node(data)
    this._root = node
}

// Depth first search
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
         
        // step 1
    })(this._root);
 
};

var tree = new Tree('one');
 
tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree;
 
tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;
 
tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];

// tree.traverseDF(function(node) {
//     console.log(node.data)
// });
 

//  Breadth first search
function  Queue(){
    this.dataStore = []
    this.enqueue = enqueue
    this.dequeue = dequeue
    this.length  = length
}

function length(){
    return this.dataStore.length
}

function enqueue(element){
    this.dataStore.push(element)
}

function dequeue(){
    this.dataStore.shift()
}


Tree.prototype.traverseBF = function(callback){
    var queue = new Queue();

    queue.enqueue(this._root)
    
    currentNode = queue.dequeue();
    while(currentNode){
        for(var i=0; i<currentNode.children.length; i++)
            queue.enqueue(currentNode.children[i])
   
        callback(currentNode)
        currentNode = queue.dequeue()
    }
    // console.log(queue)
}

tree.traverseBF(function(node) {
    console.log(node.data)
});