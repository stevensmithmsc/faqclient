import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { get_homepage, update_homepage } from '../actions';
import pacman from '../Images/pacman.gif';

class HomeEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greeting: this.props.home.greeting,
            description: this.props.home.description,
            directions: this.props.home.directions,
            warning: this.props.home.warning,
            modal: false
        };

    }

    componentDidMount() {
        const now = new Date();

        if (!this.props.home.fetched || now - this.props.home.fetched > 300000) {
            this.props.get_homepage();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.home.fetched !== nextProps.home.fetched) {
            this.setState({
                greeting: nextProps.home.greeting,
                description: nextProps.home.description,
                directions: nextProps.home.directions,
                warning: nextProps.home.warning
            });
        }
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

    handleSave() {
        const data = { greeting: this.state.greeting, description: this.state.description, directions: this.state.directions, warning: this.state.warning };
        
        this.props.update_homepage(data);
        this.props.history.push("/");
    }

    render() {
        if (this.props.home.loading) {
            return (
                <div>
                    {this.props.home.loading ? <img src={pacman} className="float-right" alt="loading..." height="50" width="50" /> : ""}
                    <h1>Loading...</h1>
                </div>
                );
        }
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
                {this.props.canEdit? 
                <div className="float-right">
                    <Button color="primary" onClick={() => this.handleSave()} >Save</Button>&nbsp;&nbsp;
                    <Button color="danger" onClick={() => this.loadHomePageData()}>Undo</Button>
                </div> : "" }
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

function mapStateToProps(state) {
    const home = state.home;
    const canEdit = state.currentUser.canEditHomePage;
    return { home, canEdit };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ get_homepage, update_homepage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeEdit);