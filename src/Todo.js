import React from 'react';
import { ListGroupItem } from 'reactstrap';

function Todo({text}) {
    return(
        <ListGroupItem>{text}</ListGroupItem>
    )
}

export default Todo;