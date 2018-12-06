import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Helmet from 'react-helmet';
import SidebarItem from './SidebarItem';
import { toggle_cats } from '../actions';
import pacman from '../Images/pacman.gif';

function Sidebar(props) {
    //const selected = [];
    let sysStyle = "";
    if (props.selected !== []) {
        //selected = props.location.pathname.split("/").slice(2);
        const system = props.cats.find(s => s.categoryName === props.selected[0]);
        if (system) {
            sysStyle = system.style;
        }
    } 
    
    return (
        <div>
            <ul className="list-unstyled">
                {props.cats
                    .sort(function (a, b) {
                        var x = a.categoryName.toLowerCase();
                        var y = b.categoryName.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    })
                    .map(c => <SidebarItem key={c.id} item={c} toggle={props.toggle_cats} path="/Category" />)}
            </ul>
            {props.loading ? <img src={pacman} alt="loading..." height="150" width="150" /> : ""}
            <br />
            {(props.canAdd && props.selected.length < 3)  ? <NavLink to={"/NewCat/" + props.selected.join("/")} className="btn btn-primary">New Category</NavLink> : ""}


            {(sysStyle && sysStyle !== "") ? <Helmet>
                <body className={sysStyle} />
            </Helmet> : "" }
        </div>
        );
}

function mapStateToProps(state) {
    const categories = state.categories;
    const canAdd = state.currentUser.canAddCategory;
    return { cats: categories.categories, selected: categories.current, loading: categories.loading, canAdd };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggle_cats }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);