import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

class QuestionDetails extends Component {
    render() {
        if (!(this.props.question)) {
            return <p className="text-danger">Question could not be found</p>;
        }
        const md = new Remarkable();
        md.renderer = new RemarkableReactRenderer();
        return (
            <div>
                <h2>{this.props.question.title}</h2>
                <hr />
                {md.render(this.props.question.answer)}
            </div>
        );
    }
}

export default QuestionDetails;