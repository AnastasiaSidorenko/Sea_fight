import React from 'react';
import { Square } from "./Square"

export class Board extends React.Component {
    renderSquare(i, j) {
        return <Square key={i * 10 + j} shipType={this.props.ships[i][j]} type={this.props.type} value={this.props.squares[i][j]} onClick={() => this.props.onClick(i, j, this.props.type)} />
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
                    <div className="squares">
                        {numbers.map((value, idx) => {
                            return <div key={idx} className="board-row">
                                {numbers.map((value, index) => {
                                    //return this.renderSquare(idx * 10 + index)
                                    return this.renderSquare(idx, index)
                                })}</div>
                        })}
                    </div>
                </div>
            </div >
        )
    }
}
