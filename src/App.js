import React, { Component } from "react";
import { NameRequest } from "./Components/NameRequest/NameRequest"
import { Game } from "./Components/Game"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }

    getUserName = (name) => {
        this.setState({ user: name })
    }

    render() {
        if (this.state.user) {
            return <Game name={this.state.user} />
        }
        else {
            return <NameRequest getUserName={this.getUserName} />
        }
    }
}

export default App;