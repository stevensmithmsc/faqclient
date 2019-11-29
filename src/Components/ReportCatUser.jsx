import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportData } from '../actions';

class ReportCatUser extends Component {
    componentDidMount() {
        this.props.getReportData(4);
    }

    render() {
        return (
            <div>
                <h3>System and Author Report</h3>
                <table className="table table-striped">
                    <thead>
                        <tr><th>System</th><th>Author</th><th>Number of Questions</th></tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((c, i) => <tr key={i}><td>{c.system}</td><td>{c.author}</td><td>{c.count}</td></tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const data = state.reports.sysAuthData;
    return { data };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getReportData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportCatUser);