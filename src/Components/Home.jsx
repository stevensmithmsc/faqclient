import React, { Component } from 'react';
import DataContext from '../DataContext';
import QuestionList from './QuestionList';

class Home extends Component {

    render() {
        return (
            <div>
                <h1>Hello</h1>

                    <DataContext.Consumer>
                        {(data) => <QuestionList questions={data} />}
                    </DataContext.Consumer>
                <hr />
            </div>
            );
    }
}

export default Home;