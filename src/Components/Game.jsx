import React from 'react';
import { Board } from './Board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _userSquares: Array(100).fill(null),
            _systemSquares: Array(100).fill(null),
            systemIsNext: true,
            isGameEnded: false
        };
    }

    handleClick(i, type) {
        if (type === "system") {
            let squares = this.state._systemSquares.slice();
            squares[i] = "X";
            this.setState({ _systemSquares: squares });
            console.log("systemBoard")
        }
        else {
            console.log("userBoard")
        }
    }

    startAgain = () => {

    }

    render() {
        let status = 'Следующий ход: ' + (this.state.systemIsNext ? 'Вы' : 'Система');
        let moves;
        let StartAgain = () => {
            if (this.state.isGameEnded) {
                return <button className="submit_button" onClick={this.startAgain}>Начать сначала</button>
            }
            else return '';
        }

        return (
            <div className="game">
                <div className="status">{status}</div>
                <div className="game-space">
                    <div className="game-boards">
                        <Board squares={this.state._userSquares} type="user" onClick={i => this.handleClick(i, "user")} />
                        <Board squares={this.state._systemSquares} type="system" onClick={i => this.handleClick(i, "system")} />
                    </div>
                    <div className="game-info">
                        <div>Текущий статус</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <StartAgain />
            </div>
        );
    }
}
