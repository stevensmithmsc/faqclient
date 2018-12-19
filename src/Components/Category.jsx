import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Button } from 'reactstrap';
import QuestionList from './QuestionList';
import { delete_cat, current_cat, update_searchstring } from '../actions';
import Paginator from './Paginator';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 1 };
    }

    componentDidMount() {
        this.getQuestions();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.cat !== this.props.match.params.cat
            || prevProps.match.params.sub !== this.props.match.params.sub
            || prevProps.match.params.third !== this.props.match.params.third) {
            this.getQuestions();
        }    
    }

    getQuestions() {
        var catSearch = [];
        if (this.props.match.params.third) {
            catSearch = [this.props.match.params.cat, this.props.match.params.sub, this.props.match.params.third];
        }
        else if (this.props.match.params.sub) {
            catSearch = [this.props.match.params.cat, this.props.match.params.sub];
        }
        else {
            catSearch = [this.props.match.params.cat];
        }
        this.props.update_searchstring(catSearch, null);
        //fetch("http://localhost:60824/api/Questions?cats=" + catSearch.join(","))
        //    .then(function (response) {
        //        return response.json();
        //    })
        //    .then(data => this.updateData(data));
        this.props.current_cat(catSearch);
    }

    updateData(data) {
        //console.log(data);
        this.setState({ questions: data.questions });
    }

    handleDelete() {
        const lastCat = this.props.match.params.third ? this.props.match.params.third : this.props.match.params.sub ? this.props.match.params.sub : this.props.match.params.cat;
        const catType = this.props.match.params.third ? "subcategory" : this.props.match.params.sub ? "category" : "system";
        
        let categoryId = "";
        
        const system = this.props.cats.find(s => s.categoryName === this.props.match.params.cat);
        if (this.props.match.params.sub) {
            const cat = system.subs.find(c => c.categoryName === this.props.match.params.sub);
            if (this.props.match.params.third) {
                const subCat = cat.subs.find(c => c.categoryName === this.props.match.params.third);
                categoryId = subCat.id;
            } else {
                categoryId = cat.id;
            }
        } else {
            categoryId = system.id;                
        }

        
        //eslint-disable-next-line
        if (confirm(`Are you sure you want to delete ${catType}: ${lastCat}?`)) {
            console.log("Delete", categoryId);
            this.props.delete_cat(categoryId);
            //fetch("http://localhost:60824/api/Category/" + categoryId, {
            //    method: "DELETE",
            //    credentials: "include"
            //}).then((response) => this.processDelete(response));
            this.props.history.push("/");
        }
    }

    //processDelete(response) {
    //    if (response.ok) {
    //        this.props.refresh();
    //        this.props.history.push("/");
    //    } else {
    //        alert("Problem Deleteing Category");
    //        console.log(response);
    //    }
    //}

    setPage(p) {
        this.setState({ page: p });
    }

    render() {
        const lastCat = this.props.match.params.third ? this.props.match.params.third : this.props.match.params.sub ? this.props.match.params.sub : this.props.match.params.cat;
        const catType = this.props.match.params.third ? "Subcategory" : this.props.match.params.sub ? "Category" : "System";
        return (
            <div>
                {this.props.fetching ? <img src={process.env.PUBLIC_URL + "/Images/pacman.gif"} className="float-right" alt="loading..." height="50" width="50" /> : ""}
                <h2>{catType}: {lastCat}</h2>
                {this.props.searchString !== "" ?
                <QuestionList page={this.state.page} /> : "Loading..."}
                {this.props.totalPages > 1 ?
                <Paginator current={this.state.page} maxPage={this.props.totalPages} goToPage={this.setPage.bind(this)} /> : ""}

                {this.props.totalQs === 0 && this.props.canDelete ? <Button onClick={() => this.handleDelete()} color="danger">Delete This Category</Button> : "" }               
            </div>
            );
    }
}

function mapStateToProps(state) {
    const categories = state.categories.categories;
    const canDelete = state.currentUser.canDeleteCategory;
    const fetching = state.questions.fetching;
    const totalQs = state.questions.totalQs;
    const totalPages = state.questions.totalPages;
    const searchString = state.questions.searchString;
    return { cats: categories, canDelete, fetching, totalQs, totalPages, searchString };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ delete_cat, current_cat, update_searchstring }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);