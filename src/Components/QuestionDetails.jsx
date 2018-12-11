import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { feedbackUseful, feedbackComment, get_feedback, current_cat } from '../actions';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Button, ButtonGroup, Input, InputGroup, InputGroupAddon, Collapse, ListGroup, ListGroupItem } from 'reactstrap';

class QuestionDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { showFeedback: false, isHelpful: this.props.question.helpful, comment: this.props.question.comment, showThanks: false };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    componentDidMount() {
        if (this.props.canEdit) {
            //fetch("http://localhost:60824/api/Feedback/" + this.props.question.id, { credentials: "include" })
            //    .then((response) => this.processResponse(response));
            this.getFeedbackIfNoneOrOld();
        }
        this.props.current_cat(this.props.question.categories);
    }

    getFeedbackIfNoneOrOld() {
        const now = new Date();

        if (!this.props.feedback || now - this.props.feedback.fetched > 300000) {
            this.props.get_feedback(this.props.question.id);
        } 
    }

    //processResponse(response) {
    //    if (response.ok) {
    //        response.json().then(data => this.updateFeedback(data));
    //    } else {
    //        this.setState({ noFeedback: true });
    //        if (response.status !== 404) {
    //            console.log(response);
    //        }
    //    }
    //}

    //updateFeedback(data) {
    //    this.setState({ feedback: data });
    //}

    onRadioBtnClick(isHelpful) {
        //const feedback = { id: this.props.question.id, helpful: isHelpful===1 };
        //fetch("http://localhost:60824/api/Feedback/" + this.props.question.id, {
        //    method: "POST",
        //    headers: {
        //        "Content-Type": "application/json; charset=utf-8"
        //    },
        //    credentials: "include",
        //    body: JSON.stringify(feedback)
        //})
        //    .then((response) => this.processFeedbackResponse(response));
        //const score = this.state.score - this.state.isHelpful + isHelpful;
        this.props.feedbackUseful(this.props.question.id, isHelpful);
        this.setState({ isHelpful });
    }

    //processFeedbackResponse(response) {
    //    if (!response.ok) {
    //        alert("There was a problem saving your feedback!");
    //        console.log(response);
    //    } 
    //}

    handleToggle() {
        this.setState({ showFeedback: !this.state.showFeedback });
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    submitComment() {
        //const feedback = { id: this.props.question.id, helpful: this.state.isHelpful === 1, comment: this.state.comment };
        //fetch("http://localhost:60824/api/Feedback/" + this.props.question.id, {
        //    method: "PUT",
        //    headers: {
        //        "Content-Type": "application/json; charset=utf-8"
        //    },
        //    credentials: "include",
        //    body: JSON.stringify(feedback)
        //})
        //    .then((response) => this.processCommentResponse(response));       
        this.props.feedbackComment(this.props.question.id, this.state.isHelpful, this.state.comment);
        this.setState({ showThanks: true });
        if (this.props.canEdit) {
            setTimeout(this.props.get_feedback(this.props.question.id), 5000);
        }
    }

    //processCommentResponse(response) {
    //    if (response.ok) {
    //        this.setState({ showThanks: true });
    //        if (this.props.canEdit) {
    //            fetch("http://localhost:60824/api/Feedback/" + this.props.question.id, { credentials: "include" })
    //                .then((response) => this.processResponse(response));
    //        }
    //    } else {
    //        alert("There was a problem saving your feedback!");
    //        console.log(response);
    //    }
    //}

    render() {
        if (!(this.props.question)) {
            return <p className="text-danger">Question could not be found</p>;
        }
        const md = new Remarkable();
        md.renderer = new RemarkableReactRenderer();
        return (
            <div>
                <h2>{this.props.question.title}</h2>
                <hr />
                {md.render(this.props.question.answer)}
                <hr />
                <div className="feedback" >
                    
                    <ButtonGroup className="float-right">
                        <Button outline color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.isHelpful === 1}>Yes</Button>
                        <Button outline color="primary" onClick={() => this.onRadioBtnClick(-1)} active={this.state.isHelpful === -1}>No</Button>
                    </ButtonGroup>
                    <h4>Was this helpful?</h4>
                    <Collapse isOpen={this.state.isHelpful!==0} >
                        <InputGroup>
                            <Input id="comment" value={this.state.comment} placeholder="Please enter your comments..." onChange={this.handleChange.bind(this)} />
                            <InputGroupAddon addonType="append"><Button onClick={() => this.submitComment()} >Submit</Button></InputGroupAddon>
                        </InputGroup>
                    </Collapse>
                    <Collapse isOpen={this.state.showThanks} ><p>Thankyou for your feedback.</p></Collapse>
                    {this.props.canEdit && !this.state.noFeedback ? 
                        <div>
                        <p>
                            <span onClick={this.handleToggle.bind(this)} className="clickable">{this.state.showFeedback ? "\u25bc" : "\u25b6"} Show Feedback</span>                        
                        </p>
                        <Collapse isOpen={this.state.showFeedback}>
                            <div className="row">
                                <div className="col-md-4">
                                        Yes: {this.props.feedback && this.props.feedback.yeses}
                                </div>
                                <div className="col-md-4">
                                        No: { this.props.feedback && this.props.feedback.noes}
                                </div>
                                <div className="col-md-4">
                                    Score: {this.props.question.score}
                                </div>
                                <div className="col-md-6">
                                    <h6>"Yes" Comments:</h6>
                                    <ListGroup>
                                            {this.props.feedback && this.props.feedback.yesComments.map((c, i) => <ListGroupItem key={i}>{c}</ListGroupItem>)}
                                    </ListGroup>
                                </div>
                                <div className="col-md-6">
                                    <h6>"No" Comments:</h6>
                                    <ListGroup>
                                            {this.props.feedback && this.props.feedback.noComments.map((c, i) => <ListGroupItem key={i}>{c}</ListGroupItem>)}
                                    </ListGroup>
                                </div>
                            </div>
                            </Collapse> 
                        </div> : ""}
                </div>
                {this.props.canEdit ? 
                <p className="authors">
                    Original Author: {this.props.question.author}
                    {this.props.question.editor ? <span>, Last Editor: {this.props.question.editor}</span> : ""}                   
                </p> : ""}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const feedback = state.feedback.filter(f => f.id === ownProps.question.id)[0];
    return { feedback };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ feedbackUseful, feedbackComment, get_feedback, current_cat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);