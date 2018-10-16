import React, { Component } from 'react';
import QuestionDetails from './QuestionDetails';
import { Link } from 'react-router-dom';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = { question: {} };
    }

    componentDidMount() {
        fetch("http://localhost:60824/api/Questions/" + this.props.match.params.id)
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
                {this.props.canEdit ? <p className="float-right"><Link to={`/Edit/${this.props.match.params.id}`}>Edit</Link></p> : ""}
                
                <QuestionDetails question={this.state.question} canEdit={this.props.canEdit} />
                
            </div>
            );
    }
}

export default Question;