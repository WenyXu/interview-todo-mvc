import React, { useState, useEffect } from 'react';
import { Input, ListGroup, Container } from 'reactstrap';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const getTodos = () => {
        const list = localStorage.getItem('todos');
        setTodos(JSON.parse(list));
    }

    const addTodo = val => setTodos([...todos, val]);

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

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    return(
        <Container>
            <Input placeholder="Write down a task..." 
                value={task} 
                onChange={handleChange}
                onKeyDown={handleSubmit}
                bsSize="lg"
            />
            <br/>
            {   
                !!todos.length && (
                    <ListGroup>
                        {todos.map((todo, i) => <Todo text={todo} key={i} />)}
                    </ListGroup>

                )
            }

        </Container>

    )
}

export default TodoList;