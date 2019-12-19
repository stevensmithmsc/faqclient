import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import QuestionList from './QuestionList';
import { update_searchstring } from '../actions';
import Paginator from './Paginator';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 1 };
    }

    componentDidMount() {
        if (this.props.searchCats)
            this.props.update_searchstring(this.props.categories, this.props.match.params.keyword);
        else
            this.props.update_searchstring(null, this.props.match.params.keyword);
        //fetch("http://localhost:60824/api/Questions?keyWord=" + this.props.match.params.keyword)
        //    .then(function (response) {
        //        return response.json();
        //    })
        //    .then(data => this.updateData(data));
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.match.params.keyword !== this.props.match.params.keyword) ||
            (prevProps.searchCats !== this.props.searchCats)) {
            //fetch("http://localhost:60824/api/Questions?keyWord=" + this.props.match.params.keyword)
            //    .then(function (response) {
            //        return response.json();
            //    })
            //    .then(data => this.updateData(data));
            if (this.props.searchCats)
                this.props.update_searchstring(this.props.categories, this.props.match.params.keyword);
            else
                this.props.update_searchstring(null, this.props.match.params.keyword);
        }       
    }

    //updateData(data) {
    //    console.log(data);
    //    this.setState({ questions: data.questions });
    //}

    setPage(p) {
        this.setState({ page: p });
    }

    render() {
        return (
            <div>               
                {this.props.fetching ? <img src={process.env.PUBLIC_URL + "/Images/pacman.gif"} className="float-right" alt="loading..." height="50" width="50" /> : ""}

                {this.props.searchString !== "" ?
                    <QuestionList page={this.state.page} /> : "Loading..."}
                {this.props.totalPages > 1 ?
                    <Paginator current={this.state.page} maxPage={this.props.totalPages} goToPage={this.setPage.bind(this)} /> : ""}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const categories = state.categories.current;
    const searchCats = state.categories.searchCats;
    const fetching = state.questions.fetching;
    const totalPages = state.questions.totalPages;
    const searchString = state.questions.searchString;
    return { categories, searchCats, fetching, totalPages, searchString };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ update_searchstring }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);