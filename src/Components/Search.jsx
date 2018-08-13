import React, { Component } from 'react';
import DataContext from '../DataContext';
import QuestionList from './QuestionList';

class Search extends Component {
    render() {
        return (
            <div>               

                <DataContext.Consumer>
                    {(data) => <QuestionList questions={data.filter(q => q.keyWords.includes(this.props.match.params.keyword))} />}
                </DataContext.Consumer>

            </div>
        );
    }
}

export default Search;