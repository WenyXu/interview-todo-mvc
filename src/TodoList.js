import React, { useState, useEffect } from 'react';
import { Input, ListGroup } from 'reactstrap';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const getTodos = () => {
        const list = localStorage.getItem('todos').json();
        setTodos(list);
    }

    const addTodo = val => {
        setTodos([...todos, e.target.value]);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    const handleChange = e => setTask(e.target.value);

    const handleSubmit = e => {
        if (e.keyCode === 13) {
            addTodo(task)
            setTask('');
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return(
        <div>
            <Input placeholder="Write down a task!" 
                value={task} 
                onChange={handleChange}
                onKeyDown={handleSubmit}

            />
            {   
                todos.length && (
                    <ListGroup>
                        {todos.map((todo, i) => {
                            <Todo text={todo} key={i} />
                        })}
                    </ListGroup>

                )
            }

        </div>

    )
}

export default TodoList;