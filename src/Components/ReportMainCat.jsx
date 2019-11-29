import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportData } from '../actions';

class ReportMainCat extends Component {
    componentDidMount() {
        this.props.getReportData(2);
    }

    render() {
        return (
            <div>
                <h3>System Report</h3>
                <table className="table table-striped">
                    <thead>
                        <tr><th>System</th><th>Number of Questions</th></tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((c, i) => <tr key={i}><td>{c.system}</td><td>{c.count}</td></tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const data = state.reports.systemData;
    return { data };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getReportData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMainCat);