import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class HomeEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { greeting: "Welcome to ...", description: "This application is for ...", directions: "To use this app....", warning: "Note: Searching may bring back too many answers.", modal: false };

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

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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

                <div className="float-left">
                    <Button color="primary" onClick={this.toggle.bind(this)} >Preview</Button>
                </div>
                <div className="float-right">
                    <Button color="primary" >Save</Button>&nbsp;&nbsp;
                    <Button color="danger" >Undo</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} size="lg">
                    <ModalHeader toggle={this.toggle.bind(this)}>{this.state.greeting}</ModalHeader>
                    <ModalBody>
                        {md.render(this.state.description)}
                        <hr />
                        {md.render(this.state.directions)}
                        <hr />
                        <p className="text-danger">{this.state.warning}</p>
                    </ModalBody>
                </Modal>

                
            </div>
        );
    }
}

export default HomeEdit;