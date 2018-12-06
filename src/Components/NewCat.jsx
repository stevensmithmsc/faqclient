import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { create_cat } from '../actions';

class NewCat extends Component {
    constructor(props) {
        super(props);
        this.state = { categoryName: "" };
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value.replace("/", "").replace(",", "");
        this.setState(newObj);
    }

    handleCreate() {
        const parents = this.props.location.pathname.split("/").slice(2);
        let parentCategory = "";
        if (parents.length > 0 && parents[0] !== "") {
            const system = this.props.cats.find(s => s.categoryName === parents[0]);
            if (parents.length === 1) {
                parentCategory = system.id;
            } else {
                const cat = system.subs.find(c => c.categoryName === parents[1]);
                parentCategory = cat.id;
            }
        }
        //const data = { parent: parentCategory, categoryName: this.state.categoryName };
        //console.log(data);
        //fetch("http://localhost:60824/api/Category/", {
        //    method: "POST",
        //    headers: {
        //        "Content-Type": "application/json; charset=utf-8"
        //    },
        //    credentials: "include",
        //    body: JSON.stringify(data)
        //})
        //    .then((response) => this.processResponse(response));
        this.props.create_cat(parentCategory, this.state.categoryName);
        this.props.history.push("/");
    }

    //processResponse(response) {
    //    if (response.ok) {
    //        this.props.refresh();
    //        this.props.history.push("/");
    //    } else {
    //        alert("Problem Creating Category");
    //        console.log(response);
    //    }
    //}
    
    
    render() {
        const parents = this.props.location.pathname.split("/").slice(2);

        return (
            <div>
                <h2>New {(parents[0]==="")?"System":(parents.length===1)?"Category":"Subcategory"}</h2>
                <hr />
                <p>Parent Categories: {parents.join("/")}</p>
                <div className="form-group">
                    <label htmlFor="newCat">New Category:</label>
                    <input type="text" className="form-control" id="categoryName" placeholder="Please enter the category name." value={this.state.categoryName} onChange={this.handleChange.bind(this)}/>
                </div> 
                {this.props.canAdd && this.state.categoryName.length > 0 ?
                <Button color="primary" onClick={() => this.handleCreate()} >Create Category</Button> : ""}

            </div>
            );       
    }
}

function mapStateToProps(state) {
    const categories = state.categories.categories;
    const canAdd = state.currentUser.canAddCategory;
    return { cats: categories, canAdd };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ create_cat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCat);