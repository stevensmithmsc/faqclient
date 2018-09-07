import React, { Component } from 'react';
import QuestionDetails from './QuestionDetails';
import { Link } from 'react-router-dom';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = { question: {} };
    }

    componentDidMount() {
        fetch("http://localhost:58068/api/Questions/" + this.props.match.params.id)
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateQuestion(data));
    }

    updateQuestion(data) {
        console.log(data);
        this.setState({ question: data });
    }

    render() {
        return (
            <div>
                <p className="float-right"><Link to={`/Edit/${this.props.match.params.id}`}>Edit</Link></p>
                
                <QuestionDetails question={this.state.question} />
                
            </div>
            );
    }
}

export default Question;