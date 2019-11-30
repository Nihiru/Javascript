import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/**
    -) App constructor is called
    -) React's virtual DOM is a tree of React nodes
    -) A ReactNode is a building block for a virtual DOM and can be either
        -) ReactElement  : Primary type in React. Its light, stateless, immutable, virtual representation of a DOM element
        -) ReactText     : This is a string or number. It's a virtual representation of a text node in the DOM.
        -) ReactFragment : Array of react node elements 
    -) ReactDOM.render(ReactElement, DOMElement, callback)
        -) ReactElement is the root element in the tree of ReactNodes
            -) ReactElement takes three parameters
                -) type : It can be either
                    -) String     : Could be an HTML tag name such as div, p, span and so on.
                                    React support all the common HTML tags and attributes
                    -) ReactClass : A custom component created via React.createClass method
                -) props:
                    -) Plain old Javascript object
                    -) While creating DOM Elements with React the props object represents HTML attributes i.e, class, style
                -) Children:
                    -) It describes the child elements which could be present under an element
                    -) https://gist.github.com/osmelmora/71e7ac077f2bbe590311998e237ca068#file-react-children-example-html

        -) DOMElement is a container DOM node of the tree
        -) callback is optional function executed after the tree is rendered or updated
    -) Reference
        -) https://medium.com/react-ecosystem/react-a-gentle-introduction-407fb59d3514
    
 */  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
