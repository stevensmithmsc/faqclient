import React, { Component } from 'react';
import DataContext from '../DataContext';
import QuestionList from './QuestionList';

class Category extends Component {
    questionFilter(q) {
        if (this.props.match.params.third) {
            return q.categories[0] === this.props.match.params.cat && q.categories[1] === this.props.match.params.sub && q.categories[2] === this.props.match.params.third;
        }
        if (this.props.match.params.sub) {
            return q.categories[0] === this.props.match.params.cat && q.categories[1] === this.props.match.params.sub;
        }
        return q.categories[0] === this.props.match.params.cat;
    }

    render() {
        const lastCat = this.props.match.params.third ? this.props.match.params.third : (this.props.match.params.sub ? this.props.match.params.sub : this.props.match.params.cat);
        return (
            <div>
                <h2>Category: {lastCat}</h2>

                <DataContext.Consumer>
                    {(data) => <QuestionList questions={data.filter((q) => this.questionFilter(q))} />}
                </DataContext.Consumer>
            </div>
            );
    }
}

export default Category;