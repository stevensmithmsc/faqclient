import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { showSearch: false, keyWord: "" };
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo float-left" alt="logo" />
                {process.env.NODE_ENV !== 'production' ? <p className="float-right">{process.env.NODE_ENV}</p> : ''}
                <h1 className="App-title">Frequently Asked Questions</h1>
                <button className="btn btn-outline-light btn-lg float-left" onClick={() => this.setState({ showSearch: !(this.state.showSearch) })}>Search</button>
                <NavLink to="/NewQuestion" className="btn btn-outline-light btn-lg float-right">New</NavLink>
                {this.state.showSearch ? 
                <div className="card text-white bg-transparent border-light searchCard mx-auto" >
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Keyword" aria-label="Keyword search" aria-describedby="button-addon2" value={this.state.keyWord} id="keyWord" onChange={this.handleChange.bind(this)} />
                                <div className="input-group-append">
                                    <NavLink className="btn btn-outline-success" type="button" id="button-addon2" to={`/Search/${this.state.keyWord}`}>Go</NavLink>
                                </div>
                        </div>
                </div>
                    : ""}
            </header>
        );
    }
}

export default Header;