import React from 'react';

export function Square(props) {
    //if this.props.type == "smth" return dndnd
    return (
        <button className="square" onClick={() => props.onClick}>
            {props.value} X
        </button>
    )
}
