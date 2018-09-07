import React, { Component } from 'react';
import QuestionForm from './QuestionForm';

class QuestionEdit extends Component {
    render() {
        return (
            <div>
                <p className="float-right">Question {this.props.match.params.id}</p>
                <QuestionForm {...this.props} />
            </div>
        );
    }
}

export default QuestionEdit;