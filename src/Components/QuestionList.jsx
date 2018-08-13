import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
    render() {
        if (this.props.questions.length === 0) {
            return <p>No Questions Found!</p>;
        }
        return (
            <ul>
                {this.props.questions.map(q => <li key={q.id}><Link to={`/Question/${q.id}`}>{q.title}</Link></li>)}
            </ul>
            );
    }
}

export default QuestionList;