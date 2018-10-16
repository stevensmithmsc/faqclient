import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import SidebarItem from './SidebarItem';

function Sidebar(props) {
    let selected = [];
    if (props.location.pathname.split("/")[1] === "Category") {
        selected = props.location.pathname.split("/").slice(2);
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
                    .map(c => <SidebarItem key={c.id} item={c} toggle={props.toggle} path="/Category" selected={selected} />)}
            </ul>
            <br />
            {props.canAdd ? <NavLink to="/NewCat" className="btn btn-primary">New Category</NavLink> : ""}
            {selected[0] === "Paris Main" ? <Helmet>
                <body className="paris" />
            </Helmet> : selected[0] === "Paris Child Health" ? <Helmet>
                <body className="childHealth" />
                </Helmet> : selected[0] === "EMIS" ? <Helmet>
                    <body className="emis" />
                    </Helmet> : selected[0] === "CIS" ? <Helmet>
                        <body className="cis" />
                    </Helmet> : "" }
        </div>
        );
}


export default withRouter(Sidebar);