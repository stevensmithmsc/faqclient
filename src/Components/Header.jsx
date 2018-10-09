import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import logo from '../logo.svg';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { showSearch: true, keyWord: "" };
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    render() {
        const showSearchBtn = false;
        return (
            <header className="App-header">
                <img src={logo} className="App-logo float-left" alt="logo" />
                {process.env.NODE_ENV !== 'production' ? <p className="float-right">{process.env.NODE_ENV}</p> : ''}
                <h1 className="App-title">Frequently Asked Questions</h1>
                {showSearchBtn ? <button className="btn btn-outline-light btn-lg float-left" onClick={() => this.setState({ showSearch: !(this.state.showSearch) })}>Search</button> : ""}
                <NavLink to="/NewQuestion" className="btn btn-outline-light btn-lg float-right">New</NavLink>
                {this.state.showSearch ? 
                <div className="card text-white bg-transparent border-light searchCard mx-auto" >
                        <InputGroup>
                            <Input type="text" className="form-control" placeholder="Enter Keyword to Search for" aria-label="Keyword search" aria-describedby="button-addon2" value={this.state.keyWord} id="keyWord" onChange={this.handleChange.bind(this)} />
                                <InputGroupAddon addonType="append">
                                    <NavLink className="btn btn-outline-success" type="button" id="button-addon2" to={`/Search/${this.state.keyWord}`}>Go</NavLink>
                                </InputGroupAddon>
                        </InputGroup>
                </div>
                    : ""}
            </header>
        );
    }
}

export default Header;