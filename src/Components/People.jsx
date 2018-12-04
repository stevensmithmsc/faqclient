import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { add_user, update_user, get_users } from '../actions';
import pacman from '../Images/pacman.gif';

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [], modal: false, new: false,
            selId: "", selName: "", selEMail: "", selAddQ: false, selEditQ: false, selDelQ: false,
            selAddCat: false, selDelCat: false, selEditHome: false, selUserAdmin: false
        };

    }

    componentDidMount() {
        //fetch("http://localhost:60824/api/People", { credentials: "include" })
        //    .then(function (response) {
        //        return response.json();
        //    })
        //    .then(data => this.updateData(data));
        this.props.get_users();
    }

    updateData(data) {
        this.setState({ people: data });
    }

    showDetails(id) {
        const selected = this.props.users.find(p => p.id === id);
        this.setState({
            new: false, modal: true, selId: selected.id, selName: selected.name, selEMail: selected.email,
            selAddQ: selected.canAddQuestion, selEditQ: selected.canEditQuestion, selDelQ: selected.canDeleteQuestion,
            selAddCat: selected.canAddCategory, selDelCat: selected.canDeleteCategory, selEditHome: selected.canEditHomePage, selUserAdmin: selected.canDoUserAdmin });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    handleCheckbox(event) {
        var newObj = {};
        newObj[event.target.id] = !this.state[event.target.id];
        this.setState(newObj);
    }

    newUser() {
        this.setState({
            new: true, modal: true, selId: "XPENNINECARE\\", selName: "", selEMail: "",
            selAddQ: false, selEditQ: false, selDelQ: false,
            selAddCat: false, selDelCat: false, selEditHome: false, selUserAdmin: false
        });
    }

    saveUser() {
        let newPerson = {
            id: this.state.selId, name: this.state.selName, email: this.state.selEMail, canAddQuestion: this.state.selAddQ,
            canEditQuestion: this.state.selEditQ, canDeleteQuestion: this.state.selDelQ, canAddCategory: this.state.selAddCat,
            canDeleteCategory: this.state.selDelCat, canEditHomePage: this.state.selEditHome, canDoUserAdmin: this.state.selUserAdmin
        };
        if (this.state.new) {
            this.props.add_user(newPerson);
        } else {
            this.props.update_user(newPerson);
        }
        this.setState({ modal: false });
    }

    //processNewResponce(responce) {
    //    if (responce.ok) {
    //        responce.json().then(data => this.AddPerson(data));
    //    } else {
    //        console.log(responce);
    //    }
    //}

    //processUpdateResponce(responce, newPerson) {
    //    if (responce.ok) {
    //        let people = this.state.people;
    //        let index = people.findIndex(p => p.id === newPerson.id);
    //        people[index] = newPerson;
    //        this.setState({ people });
    //    } else {
    //        console.log(responce);
    //    }
    //}

    //AddPerson(data) {
    //    let people = this.state.people;
    //    people.push(data);
    //    this.setState({ people });
    //}

    render() {
        return (
            <div>
                {this.props.loading ? <img src={pacman} className="float-right" alt="loading..." height="50" width="50" /> : "" }
                <h2>Users</h2>                
                <hr />
                {this.props.canDo ? <Button color="primary" className="float-right" onClick={this.newUser.bind(this)}>Add New User</Button> : ""}
                <p>Anyone not listed below can only view data</p>
                
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>AD Account</th>
                            <th>Name</th>
                            <th>E-Mail Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(p => <tr key={p.id} onClick={() => this.showDetails(p.id)}><td>{p.id}</td><td>{p.name}</td><td>{p.email}</td></tr>)}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                    <ModalHeader toggle={this.toggle.bind(this)}>{this.state.selId}</ModalHeader>
                    <ModalBody>
                        {this.state.new ? 
                            <div className="form-group">
                                <label htmlFor="selId">AD Account:</label>
                                <input type="text" className="form-control" id="selId" placeholder="Please enter user's Active Directory Account Name" value={this.state.selId} onChange={this.handleChange.bind(this)} />
                            </div> : "" }
                        <div className="form-group">
                            <label htmlFor="selName">Name:</label>
                            <input type="text" className="form-control" id="selName" placeholder="Please enter user's name" value={this.state.selName} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selEMail">E-Mail:</label>
                            <input type="email" className="form-control" id="selEMail" placeholder="Please enter user's e-mail address" value={this.state.selEMail} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selAddQ" checked={this.state.selAddQ} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selAddQ">Can Add Questions</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selEditQ" checked={this.state.selEditQ} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selEditQ">Can Edit Questions</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selDelQ" checked={this.state.selDelQ} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selDelQ">Can Delete Questions</label>
                        </div>                    
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selAddCat" checked={this.state.selAddCat} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selAddCat">Can Add Categories</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selDelCat" checked={this.state.selDelCat} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selDelCat">Can Delete Categories</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selEditHome" checked={this.state.selEditHome} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selEditHome">Can Edit Home Page</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="selUserAdmin" checked={this.state.selUserAdmin} onChange={this.handleCheckbox.bind(this)} />
                            <label className="form-check-label" htmlFor="selUserAdmin">Can Do User Admin</label>
                        </div>
                        {this.props.canDo ?
                            <div className="float-right">
                                <Button color="success" onClick={this.saveUser.bind(this)}>Save</Button>&nbsp;&nbsp;
                                <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>
                            </div> : ""}
                    </ModalBody>
                </Modal>
            </div>
            );
    }
}

function mapStateToProps(state) {
    const users = state.users.people;
    console.log(users);
    const loading = state.users.loading;
    return { users, loading };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ add_user, update_user, get_users }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(People);