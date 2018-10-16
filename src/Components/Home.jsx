import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { greeting: "Welcome to ...", description: "This application is for ...", directions: "To use this app....", warning: "Note: Searching may bring back too many answers." };

    }

    componentDidMount() {
        fetch("http://localhost:60824/api/Data")
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateData(data));
    }

    updateData(data) {
        console.log(data);
        this.setState(data);
    }

    render() {
        const md = new Remarkable();
        md.renderer = new RemarkableReactRenderer();
        return (
            <div>
                {this.props.canEdit? <p className="float-right"><Link to="/EditHome">Edit</Link></p> : "" }
                <h1>{this.state.greeting}</h1>
                <hr />
                <div>{md.render(this.state.description)}</div>
                <hr />
                <div>{md.render(this.state.directions)}</div>
                <hr />
                <p className="text-danger">{this.state.warning}</p>
            </div>
            );
    }
}

export default Home;