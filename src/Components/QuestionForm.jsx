import React, { Component } from 'react';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.question.id) {
            console.log(this.props.question);
            this.state = { title: this.props.question.title, keyWords: this.props.question.keyWords, answer: this.props.question.answer, id: this.props.question.id, categories: this.props.question.categories};
        } else {
            this.state = { title: "", keyWords: [], answer: "", categories: [] };
        }
        
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    handleArrayChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value.split(",").map(k => k.trim());
        this.setState(newObj);
    }

    handleSave() {
        if (this.state.title) {
            this.props.onSave(this.state);
            this.props.history.push("/");
        }
    }

    handleChangeSelection(e) {
        var newCat = this.state.categories;
        switch (e.target.id) {
            case "cat-0":
                if (newCat[0] !== e.target.value) {
                    newCat[0] = e.target.value;
                    newCat[1] = null;
                    newCat[2] = null;
                }
                break;
            case "cat-1":
                if (newCat[1] !== e.target.value) {
                    newCat[1] = e.target.value;
                    newCat[2] = null;
                }
                break;
            case "cat-2":
                if (newCat[2] !== e.target.value) {
                    newCat[2] = e.target.value;
                }
                break;
            default:
                break;
        }
        
        this.setState({ categories: newCat });
    }

    render() {
        const cat1visible = (this.state.categories[0] === "FAQ App");
        const cat2visible = false;
        return (
            <div>
                <h2>New Question</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="title">Question:</label>
                    <input type="text" className="form-control" id="title" placeholder="Please enter your Question" value={this.state.title} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="cat-0">Categories:</label>
                    <div className="row">
                        <div className="col-sm-4">
                            <select type="text" className="form-control" id="cat-0" value={this.state.categories[0]} onChange={this.handleChangeSelection.bind(this)} >
                                <option value="">Please select category</option>
                                <option>General</option>
                                <option>FAQ App</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                            {cat1visible ? 
                            <select type="text" className="form-control" id="cat-1" value={this.state.categories[1]} onChange={this.handleChangeSelection.bind(this)} >
                                <option value="">Please select category</option>
                                <option>New Question</option>
                                <option>Search</option>
                            </select> : "" }
                        </div>
                        <div className="col-sm-4">
                            {cat2visible ?
                            <select type="text" className="form-control" id="cat-2" value={this.state.categories[2]} onChange={this.handleChangeSelection.bind(this)} >
                                <option value="">Please select category</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select> : ""}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="keyWords">Key Words:</label>
                    <input type="text" className="form-control" id="keyWords" placeholder="Please enter key words seperated by commas" value={this.state.keyWords.join(", ")} onChange={this.handleArrayChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="answer">Answer:</label>
                    <textarea type="text" className="form-control" id="answer" rows="10" placeholder="Please enter the answer" value={this.state.answer} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="float-right">
                    <button className="btn btn-primary" onClick={this.handleSave.bind(this)} >Save</button>&nbsp;&nbsp;
                    <button className="btn btn-danger">Clear</button>
                </div>
            </div>
        );
    }
}

export default QuestionForm;