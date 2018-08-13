import React, { Component } from 'react';

class QuestionDetails extends Component {
    render() {
        if (!(this.props.question)) {
            return <p className="text-danger">Question could not be found</p>;
        }
        return (
            <div>
                <h2>{this.props.question.title}</h2>
                <hr />
                <p>{this.props.question.answer}</p>
            </div>
        );
    }
}

export default QuestionDetails;