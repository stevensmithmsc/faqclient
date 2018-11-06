import React, { Component } from 'react';
import DataContext from '../DataContext';
import QuestionList from './QuestionList';


class FullList extends Component {

    render() {
        return (
            <div>
                <h1>All Questions</h1>
                <hr />
                <DataContext.Consumer>
                    {(data) => <QuestionList questions={data} />}
                </DataContext.Consumer>
            </div>
        );
    }
}

export default FullList;