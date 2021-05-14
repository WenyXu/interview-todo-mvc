import React from 'react';
import TodoList from './TodoList';
import './App.css';

export default function App() {
    return(
        <div>
            <h3 id="todo-title">Todo</h3>
            <TodoList />
        </div>
    )
}