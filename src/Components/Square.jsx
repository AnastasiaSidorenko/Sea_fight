import React from 'react';

export function Square(props) {
    //if this.props.type == "smth" return dndnd
    return (
        <span className="square" onClick={props.onClick}>
            {props.value}
        </span>
    )
}
