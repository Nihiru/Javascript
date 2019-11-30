/**
-) The default exports tend to be used for whatever is expected to be retrieved from a module.
-) Explicitly importing of a particular entity is given within '{}'  
-) `import` need curly braces for named exports and doesn't need for default one. 
-) `default` property is exactly the default export.
-) Named exports enforce us to use exactly the right name to import. While for default exports the naming is done while importing
-) Objects are entities, functions are actions emitted by functions

*/

import React, {Component} from 'react';

import axios from 'axios';
/**
-) CreateTodo is an entity
-) This module declares a single entity.
*/


export default class CreateTodo extends Component{

    constructor(props){
        /**
        -) class components should always call the base constructor with props.
        -) super(props) will initiate the parent's constructor method and allows the component to inherit methods from its parent
        -) props are only read only attributes
        -) props are nothing but HTML attributes passed as arguments to react components i.e, function or class

         */   
        
        super(props);
        /*
        * -) this
            -) https://javascript.info/object-methods
            -) There is an actual difference between entity.action and entity.action() 
            -) `.` returns not a function, but a value of the special Reference Type
            -) Reference Type is a specialization type. it is not used explicitly, but it used internally by the
               language.
            -) Value of reference type is a three-value combination(base, name, strict)
                -) base   - object
                -) name   - property name
                -) strict - true if strict is in effect
            -) Arrow (() => ) have no `this`
            -) binding is needed to make `this` work in the callback.
            -) Every function has its own `this` value.
            
         */

        // To make sure this is encapsulated by the caller object 
        this.OnChangeTodoDescription = this.OnChangeTodoDescription.bind(this);
        this.OnChangeTodoResponsible = this.OnChangeTodoResponsible.bind(this);
        this.OnChangeTodoPrority     = this.OnChangeTodoPrority.bind(this);
        this.OnSubmit                = this.OnSubmit.bind(this);
         
        // local state to the class
        // when the state object changes. the component re-renders
        this.state={
            todo_description:'',
            todo_responsible:'',
            todo_priority:'',
            todo_completed:false
        }
    }

    OnChangeTodoDescription(e){
        this.setState({
            todo_description:e.target.value
        })
    }

    OnChangeTodoResponsible(e){
        this.setState({
            todo_responsible: e.target.value
        })
    }

    OnChangeTodoPrority(e){
        this.setState({
            todo_priority: e.target.value
        })
    }

    OnSubmit(e){
        e.preventDefault();

        console.log(`Form Submitted`)
        console.log(`Todo description : ${this.state.todo_description}`)
        console.log(`Todo responsible : ${this.state.todo_responsible}`)
        console.log(`Todo priority    : ${this.state.todo_priority}`)
        console.log(`Todo completed   : ${this.state.todo_completed}`)

        /*                                                                                                                      
        -) UI Update
        -) Do not modify state directly. Instead use setState() to modify it
        -) this.state can only be initalized in constructor
        -) when setState() is called, React merges the object provided in the current state.
        -) 
         */

        const newTodo = {
            todo_description : this.state.todo_description,
            todo_completed   : this.state.todo_completed,
            todo_responsible : this.state.todo_responsible,
            todo_priority    : this.state.todo_priority
        } 

        axios.post('http://localhost:4040/todos/add', newTodo)
        .then(res => console.log(res.data))
        .catch(err => {
            //res.status(400).send("Update not possible");
            console.log("Errow while posting")
        })
            
        this.setState({
            todo_description:'',
            todo_responsible:'',
            todo_priority:'',
            todo_completed:false
        })
    }


    render(){
        return(
            <div style={{marginTop:20}}>
                <h3>Create new todo</h3>
                <form onSubmit={this.OnSubmit}>
                    <div className="form-group">
                        <label> Description: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.todo_description}
                               onChange={this.OnChangeTodoDescription}
                               />                      
                        
                    </div>


                    <div className="form-group">
                        <label> Responsible: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.todo_responsible}
                               onChange={this.OnChangeTodoResponsible}
                               />                      
                        
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   name="priorityOptions"
                                   id="priorityLow"
                                   value="Low"
                                   checked={this.state.todo_priority === 'Low'}
                                   onChange={this.OnChangeTodoPrority}       
                            />
                            <label className="form-check-label"> Low </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   name="priorityOptions"
                                   id="priorityMedium"
                                   value="Medium"
                                   checked={this.state.todo_priority === 'Medium'}
                                   onChange={this.OnChangeTodoPrority}       
                            />
                            <label className="form-check-label"> Medium </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   name="priorityOptions"
                                   id="priorityHigh"
                                   value="High"
                                   checked={this.state.todo_priority === 'High'}
                                   onChange={this.OnChangeTodoPrority}       
                            />
                            <label className="form-check-label"> High </label>
                        </div>

                    </div>

                    <div className="form-group">
                        <input type="submit" 
                               value="Create Todo" 
                               className="btn btn-primary"
                        />
                    </div>
                </form>

            </div>
        )
    }
}