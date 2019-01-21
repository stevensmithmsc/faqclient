import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getAnswer, updateAnswer, createQuestion } from '../actions';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import Images from './Images';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.match.params.id) {
            console.log(this.props.question);
            if (this.props.question) {
                const q = this.props.question;
                this.state = { title: q.title, keyWords: q.keyWords, answer: q.answer, id: q.id, categories: q.categories, modal: false };
            } else {
                this.state = { title: "Fetching Data", keyWords: [], answer: "Please Wait...", id: this.props.match.params.id, categories: [], modal: false, fetching: true};
            }            
        } else {
            this.state = { title: "", keyWords: [], answer: "", categories: this.props.currentCats, modal: false};
        }        
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            //fetch("http://localhost:60824/api/Questions/" + this.props.match.params.id, { credentials: "include" })
            //    .then(function (response) {
            //        return response.json();
            //    })
            //    .then(data => this.updateQuestion(data));
            const now = new Date();

            if (!this.props.question || !this.props.question.fetched || now - this.props.question.fetched > 300000) {
                this.setState({ fetching: true });
                this.props.getAnswer(this.props.match.params.id);
            }
        }       
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id) {
            if ((!this.props.question && nextProps.question.fetched) || this.props.question.fetched !== nextProps.question.fetched) {
                const q = nextProps.question;
                this.setState({ title: q.title, keyWords: q.keyWords, answer: q.answer, categories: q.categories, fetching: false });
            }
        }
    }

    //updateQuestion(data) {
    //    console.log(data);
    //    this.setState({ title: data.title, keyWords: data.keyWords, answer: data.answer, categories: data.categories });
    //}

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    handleArrayChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value.split(",").map(k => k.trim());
        this.setState(newObj);
    }

    handleSave() {
        if (this.state.title) {
            if (this.props.match.params.id) {
                //fetch("http://localhost:60824/api/Questions/" + this.props.match.params.id, {
                //    method: "PATCH",
                //    headers: {
                //        "Content-Type": "application/json; charset=utf-8"
                //    },
                //    credentials: "include",
                //    body: JSON.stringify(this.state)
                //})
                //    .then((response) => this.processEditResponce(response));
                this.props.updateAnswer(this.state);
                this.props.history.push("/Question/" + this.state.id);
            } else {
                //fetch("http://localhost:60824/api/Questions/", {
                //    method: "POST",
                //    headers: {
                //        "Content-Type": "application/json; charset=utf-8"
                //    },
                //    credentials: "include",
                //    body: JSON.stringify(this.state)
                //})
                //    .then((response) => this.processNewResponce(response));
                this.props.createQuestion(this.state);
                this.props.history.push("/LastCreated");
            }
        }
    }

    //processEditResponce(responce) {
    //    console.log(responce);
    //    if (responce.ok) {
    //        this.saveSuccessful();
    //    }
    //}

    //processNewResponce(responce) {
    //    console.log(responce);
    //    if (responce.ok) {
    //        responce.json().then(data => this.updateId(data));
    //    }       
    //}

    //updateId(data){
    //    console.log(data);
    //    this.setState({ id: data.id });
    //    this.saveSuccessful();
    //}

    //saveSuccessful() {
    //    this.props.onSave(this.state);
    //    this.props.history.push("/Question/" + this.state.id);
    //}


    handleChangeSelection(e) {
        var newCat = this.state.categories;
        switch (e.target.id) {
            case "cat-0":
                if (newCat[0] !== e.target.value) {
                    newCat[0] = e.target.value;
                    newCat[1] = null;
                    newCat[2] = null;
                }
                break;
            case "cat-1":
                if (newCat[1] !== e.target.value) {
                    newCat[1] = e.target.value;
                    newCat[2] = null;
                }
                break;
            case "cat-2":
                if (newCat[2] !== e.target.value) {
                    newCat[2] = e.target.value;
                }
                break;
            default:
                break;
        }
        
        this.setState({ categories: newCat });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    reset() {
        if (this.props.match.params.id) {
            //fetch("http://localhost:60824/api/Questions/" + this.props.match.params.id, { credentials: "include" })
            //    .then(function (response) {
            //        return response.json();
            //    })
            //    .then(data => this.updateQuestion(data));
            const q = this.props.question;
            this.setState({ title: q.title, keyWords: q.keyWords, answer: q.answer, categories: q.categories });
        } else {
            this.setState({ title: "", keyWords: [], answer: "", categories: this.props.currentCats });
        }
    }

    render() {
        const cat1 = this.props.categories.filter(c => c.categoryName === this.state.categories[0])[0];
        const cat1visible = cat1 && cat1.subs && cat1.subs.length > 0;
        const cat2 = cat1 && cat1.subs && cat1.subs.filter(c => c.categoryName === this.state.categories[1])[0];
        const cat2visible = cat2 && cat2.subs && cat2.subs.length > 0;
        const md = new Remarkable();
        md.renderer = new RemarkableReactRenderer();
        return (
            <div>
                {this.state.fetching ? <img src={process.env.PUBLIC_URL + "/Images/pacman.gif"} className="float-right" alt="loading..." height="50" width="50" /> : ""}
                <h2>{this.props.match.params.id ? "Edit" : "New"} Question</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="title">Question:</label>
                    <input type="text" className="form-control" id="title" placeholder="Please enter your Question" value={this.state.title} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="cat-0">Categories:</label>
                    <div className="row">
                        <div className="col-sm-4">
                            <select type="text" className="form-control" id="cat-0" value={this.state.categories[0]} onChange={this.handleChangeSelection.bind(this)} >
                                <option value="">Please select system</option>
                                {this.props.categories.map(c => <option key={c.id}>{c.categoryName}</option>)}
                            </select>
                        </div>
                        <div className="col-sm-4">
                            {cat1visible ? 
                            <select type="text" className="form-control" id="cat-1" value={this.state.categories[1]} onChange={this.handleChangeSelection.bind(this)} >
                                <option value="">Please select category</option>
                                {cat1.subs.map(c => <option key={c.id}>{c.categoryName}</option>)}
                            </select> : "" }
                        </div>
                        <div className="col-sm-4">
                            {cat2visible ?
                            <select type="text" className="form-control" id="cat-2" value={this.state.categories[2]} onChange={this.handleChangeSelection.bind(this)} >
                                <option value="">Please select sub-category</option>
                                {cat2.subs.map(c => <option key={c.id}>{c.categoryName}</option>)}
                            </select> : ""}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="keyWords">Key Words:</label>
                    <input type="text" className="form-control" id="keyWords" placeholder="Please enter key words seperated by commas" value={this.state.keyWords.join(", ")} onChange={this.handleArrayChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="answer">Answer:</label>
                    <textarea type="text" className="form-control" id="answer" rows="10" placeholder="Please enter the answer" value={this.state.answer} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="float-left">
                    <Button color="primary" onClick={this.toggle.bind(this)} >Preview</Button>
                </div>
                <Images />
                { this.props.canSave ? 
                <div className="float-right">
                    <Button color="primary" onClick={this.handleSave.bind(this)} >Save</Button>&nbsp;&nbsp;
                    <Button color="danger" onClick={this.reset.bind(this)} >{this.props.match.params.id ? "Undo" : "Clear"}</Button>
                </div> : "" } 
                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} size="lg">
                    <ModalHeader toggle={this.toggle.bind(this)}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        {md.render(this.state.answer)}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const categories = state.categories.categories;
    const currentCats = state.categories.current;
    const question = state.answers.filter(q => q.id === ownProps.match.params.id)[0];
    const canSave = ownProps.match.params.id ? state.currentUser.canEditQuestion : state.currentUser.canAddQuestion;
    return { categories, currentCats, question, canSave };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAnswer, updateAnswer, createQuestion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);