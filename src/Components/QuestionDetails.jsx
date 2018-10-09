import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Button, ButtonGroup, Input, InputGroup, InputGroupAddon, Collapse } from 'reactstrap';

class QuestionDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
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
                </div>
            </div>
        );
    }
}

export default QuestionDetails;