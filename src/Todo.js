import React, { useState, useEffect } from 'react';
import { ListGroupItem } from 'reactstrap';
import circle from './assets/circle-regular.svg'
import checkCircle from './assets/check-circle-regular.svg';
import remove from './assets/remove.svg';

function Todo({id, text, handleSetTodos, todos, isCompleted, editId, setEditId}) {

    const handleClick = e => {
        if (editId) return;
        const newTodos = todos.map(todo => {
            if (todo.id === id) todo.isCompleted = !isCompleted
            return todo;
        });
        handleSetTodos(newTodos);
    }

    const handleDoubleClick = () => {
        if (isCompleted || editId) return;
        setEditId(id);
    }

    const handleDeletion = () => {
        const newTodos = todos.filter(todo => todo.id !== id);
        handleSetTodos(newTodos);
    }

    return(
        <ListGroupItem style={{backgroundColor: editId === id ? 'lightgreen' : 'white'}}>  
            <img 
                className="circle" 
                src={isCompleted ? checkCircle : circle} 
                alt="complete" 
                onClick={handleClick}
                />
            {
                !isCompleted ? 
                (<span onDoubleClick={handleDoubleClick}>{text}</span>) :
                (<strike>{text}</strike>)
            }
            <img 
                className="remove" 
                src={remove} 
                alt="delete" 
                onClick={handleDeletion}
            />
        </ListGroupItem>
        
    )
}

export default Todo;