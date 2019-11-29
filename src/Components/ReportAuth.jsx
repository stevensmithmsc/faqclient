import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportData } from '../actions';

class ReportAuth extends Component {
    componentDidMount() {
        this.props.getReportData(7);
    }

    render() {
        return (
            <div>
                <h3>User Report</h3>
                <table className="table table-striped">
                    <thead>
                        <tr><th rowSpan="2">Author</th><th colSpan="3">Number of Questions</th></tr>
                        <tr><th>Authored</th><th>Edited</th><th>Provided Feedback</th></tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((c, i) => <tr key={i}><td>{c.user}</td><td>{c.questionsAuthored}</td><td>{c.questionsEdited}</td><td>{c.feedbackProvided}</td></tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const data = state.reports.authData;
    return { data };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getReportData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportAuth);