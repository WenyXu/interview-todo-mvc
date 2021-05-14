import React, { useState, useEffect } from 'react';
import { ListGroupItem } from 'reactstrap';
import circle from './assets/circle-regular.svg'
import checkCircle from './assets/check-circle-regular.svg';
import remove from './assets/remove.svg';

function Todo({id, text, setTodos, todos, isComplete, setSelected}) {
    const [isCompleted, setComplete] = useState(false);

    const handleClick = e => {
        setComplete(!isCompleted);
        const newTodos = todos.map(todo => {
            if (todo.id === id) return {...todo, isCompleted: !isCompleted};
            return todo
        })
        if (newTodos.filter(todo => todo.isCompleted).length === todos.length) setSelected(true)
        else setSelected(false);
        setTodos(newTodos);
        
    }

    const handleDeletion = () => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    useEffect(() => {
        setComplete(isComplete);
    }, [isComplete])
    
    return(
        <ListGroupItem>
            <img className="circle" 
                 src={isCompleted ? checkCircle : circle} 
                 alt="complete" 
                 onClick={handleClick}
                 />
            {
                !isCompleted ? 
                (<span>{text}</span>) :
                (<strike>{text}</strike>)
                
            }
            <img className="remove" 
                 src={remove} 
                 alt="delete" 
                 onClick={handleDeletion}
            />
        </ListGroupItem>
    )
}

export default Todo;