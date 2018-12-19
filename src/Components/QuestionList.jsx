import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { get_page, get_background_page } from '../actions';

class QuestionList extends Component {
    componentDidMount() {
        this.getPages();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.page !== this.props.page
            || prevProps.searchString !== this.props.searchString
            || prevProps.totalQs !== this.props.totalQs) {
            this.getPages();
        }
    }

    getPages() {
        if (!this.props.questions) {
            this.props.get_page(this.props.page, this.props.searchString);
        }

        if (this.props.page < this.props.totalPages && !this.props.nextQuestions) {
            setTimeout(200, this.props.get_background_page(this.props.page + 1, this.props.searchString));
        }

        if (this.props.page > 1 && !this.props.prevQuestions) {
            setTimeout(300, this.props.get_background_page(this.props.page - 1, this.props.searchString));
        }
    }

    render() {
        if (!this.props.questions || this.props.questions.length === 0) {
            return (
                <div>
                    <p>No Questions Found!</p>
                </div>
            );
        }
        return (
            <ul>
                {this.props.questions.map(q => <li key={q.id}><Link to={`/Question/${q.id}`}>{q.title}</Link></li>)}
            </ul>
            );
    }
}

function MapStateToProps(state, ownProps) {
    const questions = state.questions.pages[ownProps.page];
    const searchString = state.questions.searchString;
    const totalQs = state.questions.totalQs;
    const totalPages = state.questions.totalPages;
    const prevQuestions = state.questions.pages[ownProps.page > 1 ? ownProps.page - 1 : 1];
    const nextQuestions = state.questions.pages[ownProps.page < totalPages ? ownProps.page + 1 : totalPages];
    return { questions, searchString, totalQs, prevQuestions, nextQuestions, totalPages };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ get_page, get_background_page }, dispatch);
}

export default connect(MapStateToProps, mapDispatchToProps)(QuestionList);