import React from 'react';
import { Square } from "./Square"

export class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} type={this.props.type} value={this.props.squares[i]} onClick={() => this.props.onClick(i, this.props.type)} />
    }

    shipsData = [
        '',
        [4, 'fourdeck'],
        [3, 'tripledeck'],
        [2, 'doubledeck'],
        [1, 'singledeck']
    ];

    render() {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const column_coordinates = ["A", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];

        return (
            <div className="board" >
                <div className="column__coordinates">
                    {column_coordinates.map((value, index) => {
                        return <div key={index} className="coordinate__column-item">{value}</div>
                    })}
                </div>
                <div>
                    {numbers.map((value, index) => {
                        return <div key={index} className="coordinate__row-item">{value}</div>
                    })}
                    <div className="squares">
                        {numbers.map((value, idx) => {
                            return <div key={idx} className="board-row">
                                {numbers.map((value, index) => {
                                    return this.renderSquare(idx * 10 + index)
                                })}</div>
                        })}
                    </div>
                </div>
            </div >
        )
    }
}
