import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'reactstrap';
import TodoList from './TodoList';
import './App.css';

export default function App() {
    const [selection, setSelection] = useState(1);
    const [numTasks, setNumTasks] = useState(0);
    return(
        <div>
            <Container>
                <Row xs="3">
                    <Col>
                        <div id="task-count">
                            {numTasks} {numTasks === 1 ? 'task' : 'tasks'} remaining
                        </div>
                    </Col>
                    <Col>
                        <h3 id="todo-title">Todo</h3>
                    </Col>
                    <Col>
                        <ButtonGroup>
                            <Button color="primary" 
                                    onClick={() => setSelection(1)}
                                    active={selection === 1}
                                    >All</Button>
                            <Button color="primary"
                                    onClick={() => setSelection(2)}
                                    active={selection === 2}    
                                    >Active</Button>
                            <Button color="primary"
                                    onClick={() => setSelection(3)}
                                    active={selection === 3}
                                    >Completed</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
            <TodoList filter={selection} setCount={setNumTasks} />
        </div>
    )
}