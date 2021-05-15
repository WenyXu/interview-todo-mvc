import React, { useState, useEffect, useRef } from 'react';
import { Input, ListGroup, Container, Button } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';

function TodoList({filter, setCount}) {
    let currList = localStorage.getItem('todos');
    if (currList) currList = JSON.parse(currList);
    else currList = [];
    const inputEl = useRef();
    const [todos, setTodos] = useState(currList);
    const [task, setTask] = useState('');
    const [isSelected, setSelected] = useState(false);
    const [editing, setEditing] = useState({isEditing: false, id: null});

    const getTodos = () => {
        const list = JSON.parse(localStorage.getItem('todos'));
        setTodos(list);
        return list;
    }

    const addTodo = val => {
        const id = uuidv4();
        setTodos([...todos, {val, isCompleted: false, id, isEditing: false}])
    }

    const updateTodo = () => setEditing({...editing, isEditing: false});

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
            if (editing.isEditing) updateTodo()
            else {
                addTodo(task)
                setTask('');
            }
        }
    }

    const handleSelect = () => {
        setSelected(!isSelected);
        const newTodos = todos.map(todo => {
            todo.isCompleted = !isSelected;
            return todo;
        });
        setTodos(newTodos);
    }

    const handleDeletion = () => {
        const newTodos = todos.filter(todo => !todo.isCompleted);
        setTodos(newTodos);
    }

    useEffect(() => {
        const list = getTodos();
        if (list.filter(todo => todo.isCompleted).length === list.length) setSelected(true);
        else setSelected(false);
    }, [])

    useEffect(() => {
        let txt = '';
        console.log(inputEl.current);
        const newTodos = todos.map(todo => {
            if (todo.id === editing.id) {
                if (editing.isEditing) {
                    txt = todo.val;
                    todo.isEditing = true;
                } else {
                    todo.val = task;
                    todo.isEditing = false;
                }
            }
            return todo;
        });
        setTodos(newTodos);
        if (editing.isEditing) {
            setTask(txt);
            inputEl.current.focus();
        } else setTask('');
    }, [editing])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        setCount(activeTodoCount());
        if (todos.filter(todo => todo.isCompleted).length === todos.length) setSelected(true);
        else setSelected(false);
    }, [todos])


    return(
        <Container>
            <Input placeholder="Write down a task..." 
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
                                return <Todo text={todo.val} 
                                            key={todo.id} 
                                            id={todo.id} 
                                            todos={todos} 
                                            setTodos={setTodos}
                                            isComplete={todo.isCompleted}
                                            setEditing={setEditing}
                                            editing={editing}
                                            isEditing={todo.isEditing}
                                        />
                            })}
                        </ListGroup>
                        <br/>
                        <Button outline color="success" onClick={handleSelect}>
                            {!isSelected ? 'Complete All' : 'Uncomplete all'}
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