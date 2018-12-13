import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import QuestionDetails from './QuestionDetails';
import { Link } from 'react-router-dom';
import { getAnswer } from '../actions';
import pacman from '../Images/pacman.gif';

class Question extends Component {
    //constructor(props) {
    //    super(props);
    //    this.state = { question: {}, recieved: false };
    //}

    componentDidMount() {
        //console.log(this.props.question);
        //fetch("http://localhost:60824/api/Questions/" + this.props.match.params.id, { credentials: "include" })
        //    .then(function (response) {
        //        return response.json();
        //    })
        //    .then(data => this.updateQuestion(data));
        const now = new Date();

        if (!this.props.question || now - this.props.question.fetched > 1800000) {
            this.props.getAnswer(this.props.match.params.id);
        }
    }

    //updateQuestion(data) {
    //    //console.log(data);
    //    this.setState({ question: data, recieved: true });
    //}

    render() {
        return (
            <div>
                {this.props.canDelete ? <button className="btn btn-danger float-right disabled">Delete</button> : ""}
                {this.props.canEdit ? <Link className="btn btn-primary float-right" to={`/Edit/${this.props.match.params.id}`}>Edit</Link> : ""}
                {this.props.question ?
                    <QuestionDetails question={this.props.question} canEdit={this.props.canEdit} />
                    : <img src={pacman} alt="loading..." />}
            </div>
            );
    }
}

function mapStateToProps(state, ownProps) {
    const canEdit = state.currentUser.canEditQuestion;
    const canDelete = state.currentUser.canDeleteQuestion;
    const question = state.answers.filter(q => q.id === ownProps.match.params.id)[0];
    return { canEdit, canDelete, question };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);