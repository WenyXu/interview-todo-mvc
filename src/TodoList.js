import React, { useState, useEffect } from 'react';
import { Input, ListGroup, Container } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';

function TodoList({filter, setCount}) {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const getTodos = () => {
        const list = JSON.parse(localStorage.getItem('todos'));
        setTodos(list);
    }

    const addTodo = val => {
        const id = uuidv4();
        setTodos([...todos, {val, isCompleted: false, id}])
    }

    const filteredTodos = () => {
        if (filter === 3) return todos.filter(todo => todo.isCompleted);
        else if (filter === 2) return todos.filter(todo => !todo.isCompleted);
        return todos;
    }

    const activeTodoCount = () => {
        return todos.filter(todo => !todo.isCompleted).length;
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

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        setCount(activeTodoCount());
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
                        {filteredTodos().map(todo => {
                            return <Todo text={todo.val} 
                                         key={todo.id} 
                                         id={todo.id} 
                                         todos={todos} 
                                         setTodos={setTodos}
                                         isComplete={todo.isCompleted}
                                    />
                        })}
                    </ListGroup>

                )
            }

        </Container>

    )
}

export default TodoList;