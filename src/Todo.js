import React, { useState, useEffect } from 'react';
import { ListGroupItem } from 'reactstrap';
import circle from './assets/circle-regular.svg'
import checkCircle from './assets/check-circle-regular.svg';

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

    useEffect(() => {
        setComplete(isComplete);
    }, [isComplete])
    
    return(
        <ListGroupItem>
            <img className="circle" 
                 src={isCompleted ? checkCircle : circle} 
                 alt="" 
                 onClick={handleClick}
                 />
            {
                !isCompleted ? 
                (<span>{text}</span>) :
                (<strike>{text}</strike>)
                
            }
        </ListGroupItem>
    )
}

export default Todo;