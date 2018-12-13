import React from 'react';
import { connect } from 'react-redux';
import QuestionDetails from './QuestionDetails';
import { Link } from 'react-router-dom';
import pacman from '../Images/pacman.gif';

function LastCreated(props) {
    if (props.question) {
        return (
            <div>
                {props.canEdit ? <Link className="btn btn-primary float-right" to={`/Edit/${props.question.id}`}>Edit</Link> : ""}
                <QuestionDetails question={props.question} canEdit={props.canEdit} />                    
            </div>
        );
    } else {
        return (
            <img src={pacman} alt="loading..." />
            );
    }   
}

function mapStateToProps(state) {
    const canEdit = state.currentUser.canEditQuestion;
    const question = state.answers.filter(q => q.id === state.currentUser.lastCreation)[0];
    return { canEdit, question };
}

export default connect(mapStateToProps)(LastCreated);

