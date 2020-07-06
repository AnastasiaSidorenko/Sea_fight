import React from 'react';

export function Square(props) {
    if (props.value === "M") {  //если промах, отобразить span(точку) внутри клетки
        return (
            <div className={"square"} onClick={props.onClick}>
                <div className="dot"></div>
            </div>
        )
    }
    return (
        //если в клетке есть корабль и это поле игрока, то отобразить палубу как закрашенную клетку
        <div className={(props.shipType && props.type === "user") ? "square square-ship" : "square"} onClick={props.onClick}>
            {props.value}
        </div >
    )
}

