import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadDocumentRequest } from '../actions';
import { bindActionCreators } from "redux";
import { Button, Modal, ModalHeader, ModalBody, Collapse, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import ImageTable from './ImageTable';

class Images extends Component {
    constructor(props) {
        super(props);
        this.state = { imageModal: false, addForm: false, selectedFile: null, loaded: 0, caption: "" };
    }

    toggle() {
        this.setState({
            imageModal: !this.state.imageModal
        });
    }

    toggleAddForm() {
        this.setState({
            addForm: !this.state.addForm
        });
    }

    handleChange(event) {
        var newObj = {};
        newObj[event.target.id] = event.target.value;
        this.setState(newObj);
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    }

    handleSubmit() {
        console.log(this.state.caption, this.state.selectedFile.name);
        this.props.uploadDocumentRequest(this.state.selectedFile, this.state.caption);
        this.setState({ caption: "", selectedFile: null });
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle.bind(this)} >Images</Button>
                <Modal isOpen={this.state.imageModal} toggle={this.toggle.bind(this)} size="lg">
                    <ModalHeader toggle={this.toggle.bind(this)}>
                        Images
                    </ModalHeader>
                    <ModalBody>
                        {this.props.canAdd ?
                            <div>
                        <Collapse isOpen={this.state.addForm} >
                            <Button onClick={this.toggleAddForm.bind(this)} className="float-right" color="info">Hide</Button>
                            <h3>Add New Image</h3>
                            <FormGroup row>
                                <Label for="caption" sm={2}>Caption</Label>
                                <Col sm={10}>
                                    <Input type="text" id="caption" name="caption" placeholder="Please enter Caption for Image" value={this.state.caption} onChange={this.handleChange.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="fileUpload" sm={2}>Image File</Label>
                                <Col sm={10}>
                                    <Input type="file" id="fileUpload" name="fileUpload" onChange={this.handleselectedFile.bind(this)} />
                                    <FormText color="muted">Example block-level help text here.</FormText>
                                </Col>                               
                            </FormGroup>
                            <Button color="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
                            <hr />
                        </Collapse>
                        <Button onClick={this.toggleAddForm.bind(this)} className="float-right" hidden={this.state.addForm} color="info">Add</Button></div> : ""}
                        <ImageTable />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const canAdd = state.currentUser.canAddImage;
    return { canAdd };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ uploadDocumentRequest }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Images);