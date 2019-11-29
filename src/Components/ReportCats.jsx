import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getReportData } from '../actions';

class ReportCats extends Component {
    componentDidMount() {
        this.props.getReportData(3);
    }

    render() {
        return (
            <div>
                <h3>Categories Report</h3>
                <table className="table table-striped">
                    <thead>
                        <tr><th>System</th><th>Category</th><th>Sub-Category</th><th>Number of Questions</th></tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((c, i) => <tr key={i}><td>{c.cats[0]}</td><td>{c.cats[1]}</td><td>{c.cats[2]}</td><td>{c.count}</td></tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const data = state.reports.catData;
    return { data };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getReportData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportCats);