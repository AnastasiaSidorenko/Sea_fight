import React, { Component } from "react";
import { NameRequest } from "./Components/NameRequest/NameRequest"
import { Game } from "./Components/Game"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",

            date: "",
        }
    }

    getUserName = (name) => {
        this.setState({ user: name })
    }

    startAgain = () => {
        this.setState({ date: this.getDate() })
    }

    getDate = () => {
        return Date.now();
    }

    render() {
        if (this.state.user) {
            return <Game name={this.state.user} key={this.state.date} startAgainFunction={this.startAgain} />
        }
        else {

            return <NameRequest getUserName={this.getUserName} />
        }
    }
}

export default App;