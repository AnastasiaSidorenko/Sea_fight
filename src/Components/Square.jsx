import React from 'react';

export function Square(props) {
    //if this.props.type == "smth" return dndnd
    /*return (
        <span className="square" onClick={props.onClick}>
            {props.value}
        </span>
    )*/
    if (props.value === "M") {
        return (
            <div className={"square"} onClick={props.onClick}>
                <div className="dot"></div>
            </div>
        )
    }
    //if (props.type === "user") {
    //   if (props.value == "X")
    return (
        <div className={props.shipType ? props.type === "user" ? "square square-ship" : "square" : "square"} onClick={props.onClick}>
            {props.value}
        </div >
    )
}
   /* else {
return (
<div className={shipType ? "square square-ship" : "square"} onClick={props.onClick}>
{props.value}
</div >
)
}
}*/
/* else {
     if (props.value === "M") {
         return (
             <div className={"square"} onClick={props.onClick}>
                 <div className="dot"></div>
             </div>
         )
     }
     else {
         return (
             <div className={props.shipType ? "square square-ship" : "square"} onClick={props.onClick}>
                 {props.value ? props.value : props.shipType}
             </div>
         )
     }
 }*/
/* return (
     <span className={props.shipType ? "square square-ship" : "square"} onClick={props.onClick}>
         {props.value ? props.value : props.shipType}
     </span>
 )*/
/* return (
     <span className="square" onClick={props.onClick}>
         {props.value ? props.value : props.shipType}
     </span>
 )
 */
