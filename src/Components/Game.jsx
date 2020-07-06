import React from 'react';
import { Board } from './Board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _userSquares: Array(10).fill(null).map(item => (new Array(10).fill(null))),
            _systemSquares: Array(10).fill(null).map(item => (new Array(10).fill(null))),

            _userShips: Array(10).fill(null).map(item => (new Array(10).fill(null))),
            _systemShips: Array(10).fill(null).map(item => (new Array(10).fill(null))),

            userScore: 0,
            systemScore: 0,

            status: "Ваш ход",
            finalStatus: "",
            user_name: this.props.name,
            isGameEnded: false,
        };
        //Squares - массив клеток, отмечать попадания и промахи, то есть выстрелы
        //Ships - массив клеток, где отмечены корабли
        //Score - счет игрока
    }

    handleClick = (i, j, type) => {
        let makeSystemMove = true;  //флаг - компьютер будет стрелять после этого хода
        let squares = this.state._systemSquares.slice();
        if (this.state._systemShips[i][j]) {

            this.incrementPlayerScore("user");
            squares[i][j] = "X";

            let isUserWon = this.checkGameResult("user");
            if (!isUserWon) {   //если пользователь не потопил все корабли
                this.setState({ status: `Вы попали. ${this.state.user_name}, ваш ход.` })
            }

            makeSystemMove = false;   //сделать еще один ход
        }
        else {
            squares[i][j] = "M";
            this.setState({ status: "Вы промахнулись. Компьютер стреляет" })
        }
        this.setState({ _systemSquares: squares });     //обновить массив клеток с информацией о выстрелах

        if (makeSystemMove) {
            setTimeout(() => {
                this.makeSystemMove(this.state._userSquares.slice());  //запустить ход компьютера
            }, 1000);
        }
    }

    makeSystemMove = (userSquares) => {
        let i, j;
        let makeAnotherMove = false;  //флаг - компьютер ходит один раз
        i = this.getRandom(9);  //случайная координата
        j = this.getRandom(9);
        if (userSquares[i][j]) { //если компьютер уже стрелял в клетку
            return this.makeSystemMove(userSquares);  //запустить функцию еще раз
        }
        else {
            if (this.state._userShips[i][j]) {

                this.incrementPlayerScore("system");
                this.setState({ status: "Компьютер попал в ваш корабль. Компьютер стреляет." })

                userSquares[i][j] = "X";
                let isSystemWon = this.checkGameResult("system");
                if (!isSystemWon) {
                    makeAnotherMove = true; //флаг - компьютер делает еще один выстрел
                }
            }
            else {
                userSquares[i][j] = "M";
                this.setState({ status: `Компьютер промахнулся. ${this.state.user_name}, ваш выстрел.` })
            }
            this.setState({ _userSquares: userSquares });

            if (makeAnotherMove) {
                setTimeout(() => {
                    this.makeSystemMove(userSquares);
                }, 1000);
            }
        }
    }


    incrementPlayerScore = (who) => {
        if (who === "user") {
            this.setState({ userScore: this.state.userScore + 1 })
        }
        else {
            this.setState({ systemScore: this.state.systemScore + 1 })
        }
    }

    checkGameResult = (who) => {
        if (who === "user") {
            if (this.state.userScore + 1 === 20) {  // 20 клеток занимают все корабли
                this.setState({ isGameEnded: true, finalStatus: `Поздравляем, ${this.state.user_name}! Вы выиграли` })
                return true;
            }
            return false;
        }
        else {
            if (this.state.systemScore === 20) {
                this.setState({ isGameEnded: true, finalStatus: "Вы проиграли." })
                return true;
            }
            return false;
        }
    };

    shipsData = [
        '',  //индекс в массиве означает количество кораблей этого типа
        [4, 'четырехпалубник'], //первый параметр это количество палуб(клеток)
        [3, 'трехпалубник'],
        [2, 'двухпалубник'],
        [1, 'однопалубник']
    ];


    componentDidMount = () => {  //при mount компонента Game расположить корабли на досках
        this.locateShipsRandomly("user");
        this.locateShipsRandomly("system");
    }

    locateShipsRandomly = (type) => {  //type - чья доска
        let shipsArray;
        if (type === "user") {
            shipsArray = this.state._userShips.map(function (arr) {  //сделать копию массива клеток с кораблями
                return arr.slice();
            });
        }
        else {
            shipsArray = this.state._systemShips.map(function (arr) {
                return arr.slice();
            });
        }

        for (let i = 1, length = this.shipsData.length; i < length; i++) {
            let decks = this.shipsData[i][0];  //количество палуб корабля
            let shipType = this.shipsData[i][1];   //типа корабля
            for (var j = 0; j < i; j++) {  //создать количество кораблей какого-либо типа соответственно номера его индекса
                this.locateShip(decks, shipType, shipsArray, type); //расположить корабль случайным образом
            }
        }
    }

    getRandom = (n) => {  // n - максимальное необходимое значение
        return Math.floor(Math.random() * (n + 1));
    };

    locateShip = (decks, shipType, shipsArray, type) => {
        var kx = this.getRandom(1),     //получить направление корабля
            ky = (kx === 0) ? 1 : 0,    // kx == 1 и ky == 0 - корабль расположен вертикально 
            x, y;                       // kx == 0 и ky == 1 - горизонтально.

        if (kx === 0) {         //сгенерировать начальные координаты
            x = this.getRandom(9);
            y = this.getRandom(10 - decks); // 10-кол-во палуб, чтобы не было выхода за границы поля по горизонтали
        } else {
            x = this.getRandom(10 - decks); // 10-кол-во палуб, чтобы не было выхода за границы поля по вертикали
            y = this.getRandom(9);
        }

        let result = this.checkLocationShip(x, y, kx, ky, decks, shipsArray);  //проверить может ли быть расположен корабль в этих координатах

        if (!result) return this.locateShip(decks, shipType, shipsArray, type); //если не может, то заново запустить функцию

        if (kx === 0) { //если корабль расположен горизонтально
            for (let i = 0; i < decks; i++) {
                shipsArray[x][y + i] = shipType; //ставим отметку на ячейку массива корабли, что там есть корабль
            }
        }
        else { //если корабль расположен вертикально
            for (let i = 0; i < decks; i++) {
                shipsArray[x + i][y] = shipType;
            }
        }

        if (type === "user") { //расположить на поле пользователя 
            this.setState({ _userShips: shipsArray })   //сохранить измененный массив с новым кораблем
        }
        else {
            this.setState({ _systemShips: shipsArray })
        }
    }

    checkLocationShip(x, y, kx, ky, decks, shipsArray) {

        let fromX, toX, fromY, toY;  // индексы начала и конца проверки 
        fromX = (x === 0) ? x : x - 1;  //если корабль в первой строке, то начать проверку с этой строки, если нет с строки выше

        //если корабль расположен вертикально и последняя палуба примыкает к границе поля
        if (x + kx * decks === 10 && kx === 1) toX = x + decks; //конец проверки = индекс строки последней палубы

        //если корабль расположен вертикально и после последней палубы есть еще строка по меньшей мере
        if (x + kx * decks < 10 && kx === 1) toX = x + decks + 1; //конец проверки = индекс строки после корабля

        // корабль расположен горизонтально вдоль нижней границы игрового поля
        if (x === 9 && kx === 0) toX = x + 1;

        // корабль расположен горизонтально где-то по середине игрового поля
        if (x < 9 && kx === 0) toX = x + 2;

        // формируем индексы начала и конца цикла для столбцов, принцип аналогичен строкам
        fromY = (y === 0) ? y : y - 1;
        if (y + ky * decks === 10 && ky === 1) toY = y + decks;
        if (y + ky * decks < 10 && ky === 1) toY = y + decks + 1;
        if (y === 9 && ky === 0) toY = y + 1;
        if (y < 9 && ky === 0) toY = y + 2;

        // циклы с проверкой ячеек в заданном диапазоне
        // если значение текущей ячейки не пусто (есть палуба корабля) возвращаем false
        for (var i = fromX; i < toX; i++) {
            for (var j = fromY; j < toY; j++) {
                if (shipsArray[i][j]) return false;
            }
        }
        return true;
    }

    render() {
        let StartAgain = () => {
            if (this.state.isGameEnded) { //показать кнопку Начать сначала, если игра завершена
                return <button className="submit_button" onClick={this.props.startAgainFunction}>Начать сначала</button>
            }
            else return '';
        }

        let Boards = () => {
            if (!this.state.isGameEnded) {  //если игра закончена, заблокировать возможность сделать выстрел на поле компьютера
                return (
                    <div className="game-boards">
                        <Board ships={this.state._userShips} squares={this.state._userSquares} type="user" />
                        <Board ships={this.state._systemShips} squares={this.state._systemSquares} type="system" onClick={(i, j) => this.handleClick(i, j)} />
                    </div>
                );
            }
            else {
                return (
                    <div className="game-boards">
                        <Board ships={this.state._userShips} squares={this.state._userSquares} type="user" onClick={() => { }} />
                        <Board ships={this.state._systemShips} squares={this.state._systemSquares} type="system" onClick={() => { }} />
                    </div>
                )
            }
        }

        let status = (!this.state.isGameEnded) ? this.state.status : this.state.finalStatus;

        return (
            <div className="game">
                <div className="game-info">Морской бой</div>
                <div className="game-space">
                    <Boards />
                    <div className="game-info">
                        <div>{status}</div>
                    </div>
                    <div className="game-info">
                        <StartAgain />
                    </div>
                </div>
            </div >
        );
    }
}
