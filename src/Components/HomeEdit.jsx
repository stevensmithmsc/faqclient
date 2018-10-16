import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

class HomeEdit extends Component {
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

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    render() {
        const md = new Remarkable();
        md.renderer = new RemarkableReactRenderer();
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="greeting">Greeting:</label>
                    <input type="text" className="form-control" id="greeting" placeholder="Please enter the homepage greeting..." value={this.state.greeting} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea type="text" className="form-control" id="description" rows="6" placeholder="Please enter the app description..." value={this.state.description} onChange={this.handleChange.bind(this)} />
                </div><div className="form-group">
                    <label htmlFor="directions">Directions:</label>
                    <textarea type="text" className="form-control" id="directions" rows="6" placeholder="Please enter directions for how to use the app..." value={this.state.directions} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="warning">Warning:</label>
                    <input type="text" className="form-control" id="warning" placeholder="Please enter the homepage warning..." value={this.state.warning} onChange={this.handleChange.bind(this)} />
                </div>
                <hr />
                <hr />


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

export default HomeEdit;