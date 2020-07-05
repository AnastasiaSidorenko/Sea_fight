import React from 'react';
import { Board } from './Board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //_userSquares: Array(100).fill(null),
            _userSquares: Array(10).fill(null).map(item => (new Array(10).fill(null))),
            _userShips: Array(10).fill(null).map(item => (new Array(10).fill(null))),
            //_systemSquares: Array(100).fill(null),
            _systemSquares: Array(10).fill(null).map(item => (new Array(10).fill(null))),
            _systemShips: Array(10).fill(null).map(item => (new Array(10).fill(null))),
            systemIsNext: true,
            isGameEnded: false
        };
    }

    handleClick(i, j, type) {
        if (type === "system") {
            let squares = this.state._systemSquares.slice();
            squares[i][j] = "X";
            this.setState({ _systemSquares: squares });
            console.log("systemBoard")
        }
        else {
            console.log("userBoard")
        }
    }

    /*shipsData = [
        '',  //индекс в массиве означает количество кораблей этого типа
        [4, 'fourdeck'], //первый параметр это количество палуб(клеток)
        [3, 'tripledeck'],
        [2, 'doubledeck'],
        [1, 'singledeck']
    ];*/

    shipsData = [
        '',  //индекс в массиве означает количество кораблей этого типа
        [4, '4'], //первый параметр это количество палуб(клеток)
        [3, '3'],
        [2, '2'],
        [1, '1']
    ];


    componentDidMount = () => {
        this.locateShipsRandomly("user");
        console.log("user", this.state._userShips)
        this.locateShipsRandomly("system");
        console.log("system", this.state._systemShips)
    }

    locateShipsRandomly = (type) => {
        let shipsArray
        if (type === "user") {
            shipsArray = this.state._userShips.map(function (arr) {
                return arr.slice();
            });
        }
        else {
            shipsArray = this.state._systemShips.map(function (arr) {
                return arr.slice();
            });
        }
        console.log("shipsArray initialixation", shipsArray)

        for (let i = 1, length = this.shipsData.length; i < length; i++) {
            let decks = this.shipsData[i][0];
            let shipType = this.shipsData[i][1]
            for (var j = 0; j < i; j++) {
                this.getCoordinatesDecks(decks, shipType, shipsArray, type);
            }
        }
    }

    getRandom(n) {
        // n - максимальное значение, которое хотим получить
        return Math.floor(Math.random() * (n + 1));
    }

    getCoordinatesDecks = (decks, shipType, shipsArray, type) => {
        // получаем коэффициенты определяющие направление расположения корабля
        // kx == 0 и ky == 1 — корабль расположен горизонтально,
        // kx == 1 и ky == 0 - вертикально.
        var kx = this.getRandom(1),
            ky = (kx === 0) ? 1 : 0,
            x, y;

        // в зависимости от направления расположения, генерируем
        // начальные координаты
        if (kx === 0) {
            x = this.getRandom(9);
            y = this.getRandom(10 - decks);
        } else {
            x = this.getRandom(10 - decks);
            y = this.getRandom(9);
        }
        // проверяем валидность координат всех палуб корабля:
        // нет ли в полученных координатах или соседних клетках ранее
        // созданных кораблей
        let result = this.checkLocationShip(x, y, kx, ky, decks, shipsArray);
        // если координаты невалидны, снова запускаем функцию
        if (!result) return this.getCoordinatesDecks(decks, shipType, shipsArray, type);

        // создаём объект, свойствами которого будут начальные координаты и
        // коэффициенты определяющие направления палуб
        if (kx === 0) { //корабль расположен горизонтально
            for (let i = 0; i < decks; i++) {
                shipsArray[x][y + i] = shipType;
            }
        }
        else { //если корабль расположен вертикально
            for (let i = 0; i < decks; i++) {
                shipsArray[x + i][y] = shipType;
            }
        }

        /*if (kx === 0) {
            for (let i = 0; i < decks; i++) {
                shipsArray[x * 10 + y + i] = shipType;
            }
        }
        else {
            for (let i = 1; i <= decks; i++) {
                shipsArray[x * i + y] = shipType;
            }
        }*/
        if (type === "user") {
            this.setState({ _userShips: shipsArray })
        }
        else {
            this.setState({ _systemShips: shipsArray })
        }

        /* var obj = {
             x: x,
             y: y,
             kx: kx,
             ky: ky
         };
         return obj;*/
    }

    checkLocationShip(x, y, kx, ky, decks, shipsArray) {

        let fromX, toX, fromY, toY;

        // формируем индексы начала и конца цикла для строк
        // если координата 'x' равна нулю, то это значит, что палуба расположена в самой верхней строке,
        // т. е. примыкает к верхней границе и началом цикла будет строка с индексом 0
        // в противном случае, нужно начать проверку со строки с индексом на единицу меньшим, чем у
        // исходной, т.е. находящейся выше исходной строки
        fromX = (x === 0) ? x : x - 1;
        // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
        // к нижней границе игрового поля
        // поэтому координата 'x' последней палубы будет индексом конца цикла
        if (x + kx * decks === 10 && kx === 1) toX = x + kx * decks;
        // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
        // одна строка, координата этой строки и будет индексом конца цикла
        else if (x + kx * decks < 10 && kx === 1) toX = x + kx * decks + 1;
        // корабль расположен горизонтально вдоль нижней границы игрового поля
        else if (x === 9 && kx === 0) toX = x + 1;
        // корабль расположен горизонтально где-то по середине игрового поля
        else if (x < 9 && kx === 0) toX = x + 2;

        // формируем индексы начала и конца цикла для столбцов
        // принцип такой же, как и для строк
        fromY = (y === 0) ? y : y - 1;
        if (y + ky * decks === 10 && ky === 1) toY = y + ky * decks;
        else if (y + ky * decks < 10 && ky === 1) toY = y + ky * decks + 1;
        else if (y === 9 && ky === 0) toY = y + 1;
        else if (y < 9 && ky === 0) toY = y + 2;

        // запускаем циклы и проверяем выбранный диапазон ячеек
        // если значение текущей ячейки равно 1 (там есть палуба корабля)
        // возвращаем false 
        for (var i = fromX; i < toX; i++) {
            for (var j = fromY; j < toY; j++) {
                if (shipsArray[i][j]) return false;
            }
        }
        return true;
    }

    //Array(x).fill(null).map(item =>(new Array(y).fill(null)))

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
                        <Board ships={this.state._userShips} squares={this.state._userSquares} type="user" onClick={(i, j) => this.handleClick(i, j, "user")} />
                        <Board ships={this.state._systemShips} squares={this.state._systemSquares} type="system" onClick={(i, j) => this.handleClick(i, j, "system")} />
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
