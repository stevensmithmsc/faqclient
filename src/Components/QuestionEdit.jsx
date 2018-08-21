import React, { Component } from 'react';
import DataContext from '../DataContext';
import QuestionForm from './QuestionForm';

class QuestionEdit extends Component {
    render() {
        return (
            <div>
                <p className="float-right">Question {this.props.match.params.id}</p>
                <DataContext.Consumer>
                    {(data) => <QuestionForm {...this.props} question={data.filter(q => q.id.toString() === this.props.match.params.id)[0]} />}
                </DataContext.Consumer>
            </div>
        );
    }
}

export default QuestionEdit;