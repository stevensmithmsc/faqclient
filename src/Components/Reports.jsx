import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportMainCat from './ReportMainCat';
import ReportCats from './ReportCats';
import ReportCatUser from './ReportCatUser';
import ReportAuth from './ReportAuth';

class Reports extends Component {
    render() {
        if (this.props.canView) {
            return (
                <div>
                    <p className="float-right">{this.props.fetching > 0 ? <img src={process.env.PUBLIC_URL + "/Images/pacman.gif"} alt="loading..." /> : ""}</p>
                    <h1>Reports</h1>
                    <ReportMainCat />
                    <ReportCats />
                    <ReportCatUser />
                    <ReportAuth />
                </div>
            );
        }
        return ""; 
    }
}

function mapStateToProps(state) {
    const canView = state.currentUser.canViewReports;
    const fetching = state.reports.fetching;            
    return { canView, fetching };
}

export default connect(mapStateToProps)(Reports);