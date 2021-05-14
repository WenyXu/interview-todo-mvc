import React, { useState } from 'react';
import { ListGroupItem } from 'reactstrap';
import circle from './assets/circle-regular.svg'
import checkCircle from './assets/check-circle-regular.svg';

function Todo({text}) {
    const [isCompleted, setComplete] = useState(false);

    const handleClick = e => {
        setComplete(!isCompleted);
        if (isCompleted) e.target.src = circle;
        else e.target.src = checkCircle;
    }

    return(
        <ListGroupItem>
            <img className="circle" 
                 src={circle} 
                 alt="" 
                 onClick={handleClick}
                 />
            {text}
        </ListGroupItem>
    )
}

export default Todo;