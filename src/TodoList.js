import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);

    const getTodos = () => {
        const list = localStorage.getItem('todos').json();
        setTodos(list);
    }

    const handleTodo = e => {
        setTodos([...todos, e.target.value]);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    return(
        <div>
            
        </div>

    )
}