import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Button, ButtonGroup, Input, InputGroup, InputGroupAddon, Collapse, ListGroup, ListGroupItem } from 'reactstrap';

class QuestionDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { showFeedback: false };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }

    handleToggle() {
        this.setState({ showFeedback: !this.state.showFeedback });
    }

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
                        <Button outline color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Yes</Button>
                        <Button outline color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>No</Button>
                    </ButtonGroup>
                    <h4>Was this helpful?</h4>
                    <Collapse isOpen={this.state.rSelected} >
                        <InputGroup>
                            <Input placeholder="Please enter your comments..." />
                            <InputGroupAddon addonType="append"><Button>Submit</Button></InputGroupAddon>
                        </InputGroup>
                    </Collapse>
                    {this.props.canEdit ? 
                        <div>
                        <p>
                            <span onClick={this.handleToggle.bind(this)} className="clickable">{this.state.showFeedback ? "\u25bc" : "\u25b6"} Show Feedback</span>                        
                        </p>
                        <Collapse isOpen={this.state.showFeedback}>
                            <div className="row">
                                <div className="col-md-4">
                                    Yes: 0
                                </div>
                                <div className="col-md-4">
                                    No: 0
                                </div>
                                <div className="col-md-4">
                                    Score: {this.props.question.score}
                                </div>
                                <div className="col-md-6">
                                    <h6>"Yes" Comments:</h6>
                                    <ListGroup>
                                        <ListGroupItem>Comment 1</ListGroupItem>
                                        <ListGroupItem>Comment 2</ListGroupItem>
                                        <ListGroupItem>Comment 3</ListGroupItem>
                                    </ListGroup>
                                </div>
                                <div className="col-md-6">
                                    <h6>"No" Comments:</h6>
                                    <ListGroup>
                                        <ListGroupItem>Comment 1</ListGroupItem>
                                        <ListGroupItem>Comment 2</ListGroupItem>
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

export default QuestionDetails;