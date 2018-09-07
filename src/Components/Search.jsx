import React, { Component } from 'react';
import QuestionList from './QuestionList';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { questions: [] };
    }

    componentDidMount() {
       
        fetch("http://localhost:58068/api/Questions?keyWord=" + this.props.match.params.keyword)
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateData(data));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.keyword !== this.props.match.params.keyword) {
            fetch("http://localhost:58068/api/Questions?keyWord=" + this.props.match.params.keyword)
                .then(function (response) {
                    return response.json();
                })
                .then(data => this.updateData(data));
        }       
    }

    updateData(data) {
        console.log(data);
        this.setState({ questions: data });
    }

    render() {
        return (
            <div>               

                <QuestionList questions={this.state.questions} />

            </div>
        );
    }
}

export default Search;