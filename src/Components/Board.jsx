import React from 'react';
import { Square } from "./Square"

export class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }
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
                    {numbers.map((value, index) => {
                        return <div key={index} className="board-row">
                            {numbers.map((value, index) => {
                                return this.renderSquare(index * 10 + index)
                            })}</div>
                    })}
                </div>
            </div >
        )
    }
}
