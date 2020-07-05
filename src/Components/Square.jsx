import React from 'react';

export function Square(props) {
    //if this.props.type == "smth" return dndnd
    /*return (
        <span className="square" onClick={props.onClick}>
            {props.value}
        </span>
    )*/
    if (props.type == "user") {
        return (
            <span className={props.shipType ? "square square-ship" : "square"} onClick={props.onClick}>
                {props.value}
            </span>
        )
    }
    else {
        return (
            <span className={props.shipType ? "square square-ship" : "square"} onClick={props.onClick}>
                {props.value ? props.value : props.shipType}
            </span>
        )

    }
    /* return (
         <span className="square" onClick={props.onClick}>
             {props.value ? props.value : props.shipType}
         </span>
     )
     */
}
