import React, { useState, useEffect, useRef } from 'react';
import { Input, ListGroup, Container, Button } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';

function TodoList({filter, setCount}) {
    const inputEl = useRef();
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [task, setTask] = useState('');
    const [areAllSelected, setAreAllSelected] = useState(false);
    const [editId, setEditId] = useState(null);


    const addTodo = text => {
        const id = uuidv4();
        const todo = {text, isCompleted: false, id};
        const newTodos = [...todos, todo];
        handleSetTodos(newTodos);
    }

    const handleSetTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
        setTodos(todos);
    }

    const updateTodo = () => {
        const newTodos = todos.map(todo => {
            if (todo.id === editId) todo.text = task;
            return todo;
        })
        handleSetTodos(newTodos);
        setEditId(null);
    }

    const filteredTodos = () => {
        if (filter === 3) return todos.filter(todo => todo.isCompleted);
        else if (filter === 2) return todos.filter(todo => !todo.isCompleted);
        return todos;
    }

    const activeTodoCount = () => todos.filter(todo => !todo.isCompleted).length;

    const handleChange = e => setTask(e.target.value);

    const handleSubmit = e => {
        if (e.keyCode === 13) {
            if (editId) updateTodo()
            else addTodo(task)
            setTask('');
        }
    }

    const handleSelect = () => {
        setAreAllSelected(!areAllSelected);
        const newTodos = todos.map(todo => {
            todo.isCompleted = !areAllSelected;
            return todo;
        });
        handleSetTodos(newTodos);
    }

    const handleDeletion = () => {
        const newTodos = todos.filter(todo => !todo.isCompleted);
        handleSetTodos(newTodos);
    }

    useEffect(() => {
        setAreAllSelected(todos.filter(todo => todo.isCompleted).length === todos.length);
    }, [])

    useEffect(() => {
        if (editId) {
            const text = todos.filter(todo => todo.id === editId)[0].text;
            setTask(text);
            inputEl.current.focus();
        }
    }, [editId])

    useEffect(() => {
        setCount(activeTodoCount());
        setAreAllSelected(todos.filter(todo => todo.isCompleted).length === todos.length);
    }, [todos])


    return(
        <Container>
            <Input 
                placeholder="Write down a task..." 
                value={task} 
                onChange={handleChange}
                onKeyDown={handleSubmit}
                bsSize="lg"
                innerRef={inputEl}
            />
            <br/>
            {   
                !!todos.length && (
                    <>
                        <ListGroup>
                            {filteredTodos().map(todo => {
                                return <Todo
                                            {...todo}
                                            key={todo.id} 
                                            todos={todos} 
                                            handleSetTodos={handleSetTodos}
                                            setEditId={setEditId}
                                            editId={editId}
                                        />
                            })}
                        </ListGroup>
                        <br/>
                        <Button outline color="success" onClick={handleSelect}>
                            {!areAllSelected ? 'Complete All' : 'Uncomplete all'}
                        </Button>
                        <Button outline color="danger" onClick={handleDeletion}>
                            Delete Selected
                        </Button>
                    </>

                )
            }

        </Container>

    )
}

export default TodoList;