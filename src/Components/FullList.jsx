import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import QuestionList from './QuestionList';
import { current_cat, update_searchstring } from '../actions';
import Paginator from './Paginator';

class FullList extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 1 };
    }

    componentDidMount() {
        this.props.update_searchstring(null, null);
        this.props.current_cat([]);
    }

    setPage(p) {
        this.setState({ page: p });
    }

    render() {
        return (
            <div>
                {this.props.fetching ? <img src={process.env.PUBLIC_URL + "/Images/pacman.gif"} className="float-right" alt="loading..." height="50" width="50" /> : ""}
                <h1>All Questions</h1>
                <hr />
                {this.props.searchString === "" ?
                    <QuestionList page={this.state.page} /> : "Loading..."}
                {this.props.totalPages > 1 ?
                    <Paginator current={this.state.page} maxPage={this.props.totalPages} goToPage={this.setPage.bind(this)} /> : ""}
                   
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const fetching = state.questions.fetching;
    const totalPages = state.questions.totalPages;
    const searchString = state.questions.searchString;
    return { fetching, totalPages, searchString };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ current_cat, update_searchstring }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FullList);