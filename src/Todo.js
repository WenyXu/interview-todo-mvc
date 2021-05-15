import React, { useState, useEffect } from 'react';
import { ListGroupItem } from 'reactstrap';
import circle from './assets/circle-regular.svg'
import checkCircle from './assets/check-circle-regular.svg';
import remove from './assets/remove.svg';

function Todo({id, text, setTodos, todos, isComplete, setEditing, editing, isEditing}) {
    const [isCompleted, setComplete] = useState(false);

    const handleClick = e => {
        if (isEditing) return;
        setComplete(!isCompleted);
        const newTodos = todos.map(todo => {
            if (todo.id === id) return {...todo, isCompleted: !isCompleted};
            return todo
        })
        setTodos(newTodos);
    }

    const handleDoubleClick = () => {
        if (isComplete) return;
        if (editing.isEditing) return;
        setEditing({isEditing: true, id: id});
    }

    const handleDeletion = () => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    useEffect(() => {
        setComplete(isComplete);
    }, [isComplete])

    return(
        <ListGroupItem style={{backgroundColor: isEditing ? 'lightgreen' : 'white'}}>  
            <img className="circle" 
                src={isCompleted ? checkCircle : circle} 
                alt="complete" 
                onClick={handleClick}
                />
            {
                !isCompleted ? 
                (<span onDoubleClick={handleDoubleClick}>{text}</span>) :
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