import React, { Component } from 'react';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.question.id) {
            console.log(this.props.question);
            this.state = { title: this.props.question.title, keyWords: this.props.question.keyWords, answer: this.props.question.answer, id: this.props.question.id};
        } else {
            this.state = { title: "", keyWords: [], answer: "" };
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

    render() {
        return (
            <div>
                <h2>New Question</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="title">Question:</label>
                    <input type="text" className="form-control" id="title" placeholder="Please enter your Question" value={this.state.title} onChange={this.handleChange.bind(this)} />
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