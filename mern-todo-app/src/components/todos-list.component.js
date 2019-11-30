import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed? 'completed':''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed? 'completed':''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed? 'completed':''}>{props.todo.todo_priority}</td>
        <td>
            <Link to ={"/edit/"+props.todo._id} > Edit 
            </Link>
        </td>
        
    </tr>
)

export default class TodosList extends Component{
    constructor(props){
        super(props);
        this.state = { todos : [] };
    }
    /*
        -) https://medium.com/react-ecosystem/components-the-war-horses-of-react-1085dddc14e5    
    */
    componentDidMount(){
        axios.get('http://localhost:4040/todos/')
        .then(response =>{
            this.setState({ todos: response.data });
                })
        .catch(err => {
            console.log(err);
        })

    }
    componentDidUpdate(){
        axios.get('http://localhost:4040/todos/')
        .then(response =>{
            this.setState({ todos: response.data });
                })
        .catch(err => {
            console.log(err);
        })
    }

    todoList(){
        /**
            -) https://dzone.com/articles/what-is-the-reactjs-thispropsitemsmap-property
         */
        return this.state.todos.map(function(currentTodo, i){
            debugger;
            return <Todo todo=  {currentTodo} key = {i} />;
        });
    }


    render(){
        return(
            <div>
                <h3> todos list</h3>
                <table className="table table-striped" style={{marginTop: 20}} >
                    <thead>
                        <tr>
                            
                                <th>Description</th>
                                <th>Responsible</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            
                        </tr>
                        
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}