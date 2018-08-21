import React, { Component } from 'react';
import DataContext from '../DataContext';
import QuestionDetails from './QuestionDetails';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        return (
            <div>
                <p className="float-right"><Link to={`/Edit/${this.props.match.params.id}`}>Edit</Link></p>
                <DataContext.Consumer>
                    {(data) => <QuestionDetails question={data.filter(q => q.id.toString() === this.props.match.params.id)[0]} /> }
                </DataContext.Consumer>
            </div>
            );
    }
}

export default Question;