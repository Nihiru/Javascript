const mongoose = require('mongoose');
const schema  = mongoose.Schema;

let todo = new schema({
     todo_description :{
         type : String
     },

     todo_responsible : {
         type:String
     },

     todo_priority:{
         type : String
     },

     todo_completed: {
         type: Boolean
     }
});
/**
-) .model() function makes a copy of the schema.
-) No model will be created/removed until the connnection to the model is open. Every model has an associated connection
   when mongoose.model(), model will use the default mongoose connection.
-) 
 */
module.exports = mongoose.model('Todo', todo)
