import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Link } from 'react-router-dom';
import { get_homepage, current_cat } from '../actions';
import pacman from '../Images/pacman.gif';

class Home extends Component {
    
    componentDidMount() {       
        const now = new Date();

        if (!this.props.home.fetched || now - this.props.home.fetched > 3600000) {
            this.props.get_homepage();
        } 
        this.props.current_cat([]);
    }

    render() {
        const md = new Remarkable();
        md.renderer = new RemarkableReactRenderer();
        return (
            <div>
                {this.props.canEdit ? <p className="float-right"><Link to="/EditHome">Edit</Link></p> : ""}
                {this.props.home.loading ? <img src={pacman} className="float-right" alt="loading..." height="50" width="50" /> : ""}
                <h1>{this.props.home.greeting}</h1>
                <hr />
                <div>{md.render(this.props.home.description)}</div>
                <hr />
                <div>{md.render(this.props.home.directions)}</div>
                <hr />
                <p className="text-danger">{this.props.home.warning}</p>
            </div>
            );
    }
}

function mapStateToProps(state) {
    const home = state.home;
    const canEdit = state.currentUser.canEditHomePage;
    return { home, canEdit };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ get_homepage, current_cat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);