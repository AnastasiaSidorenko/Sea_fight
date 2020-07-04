import React from 'react';
import "./nameRequest.css";

export class NameRequest extends React.Component {
    state = {
        name: ""
    }

    handleChange = (event) => {
        this.setState({ name: event.target.value })
        console.log(`User:`, this.state);
    }

    handleSubmit = () => {
        if (this.state.name !== "") {
            return this.props.getUserName(this.state.name);
        }
    }

    render() {
        return (
            <div className="nameRequest" >
                <div className="form" >
                    <div className="form__item">
                        <label className="form__item-label">Введите ваше имя</label>
                        <input onChange={event => { this.handleChange(event) }} className="form__item-field" maxLength="30"></input>
                    </div>
                </div>
                <div className="submit-container">
                    <button className="submit_button" onClick={this.handleSubmit}>Подтвердить</button>
                    <p className="error_message">{this.state.error}</p>
                </div>
            </div >
        );
    }
}