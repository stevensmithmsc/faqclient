import React, { Component } from 'react';
import { Button } from 'reactstrap';
import QuestionList from './QuestionList';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { questions: [] };
    }

    componentDidMount() {
        var catSearch = "";
        if (this.props.match.params.third) {
            catSearch = this.props.match.params.cat + ',' + this.props.match.params.sub + ',' + this.props.match.params.third;
        }
        else if (this.props.match.params.sub) {
            catSearch = this.props.match.params.cat + ',' + this.props.match.params.sub;
        }
        else {
            catSearch = this.props.match.params.cat;
        }
        fetch("http://localhost:60824/api/Questions?cats=" + catSearch)
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateData(data));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params !== this.props.match.params) {
            var catSearch = "";
            if (this.props.match.params.third) {
                catSearch = this.props.match.params.cat + ',' + this.props.match.params.sub + ',' + this.props.match.params.third;
            }
            else if (this.props.match.params.sub) {
                catSearch = this.props.match.params.cat + ',' + this.props.match.params.sub;
            }
            else {
                catSearch = this.props.match.params.cat;
            }
            fetch("http://localhost:60824/api/Questions?cats=" + catSearch)
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
        const lastCat = this.props.match.params.third ? this.props.match.params.third : (this.props.match.params.sub ? this.props.match.params.sub : this.props.match.params.cat);
        return (
            <div>
                <h2>Category: {lastCat}</h2>

                <QuestionList questions={this.state.questions} />
                {this.state.questions.length === 0 && this.props.canDelete ? <Button color="danger">Delete This Category</Button> : "" }               
            </div>
            );
    }
}

export default Category;