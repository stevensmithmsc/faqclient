import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
                        var x = a.category.toLowerCase();
                        var y = b.category.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    })
                    .map(c => <SidebarItem key={c.id} item={c} toggle={props.toggle} path="/Category" selected={selected} />)}
            </ul>
            <br />
            <NavLink to="" >New Category</NavLink>
        </div>
        );
}


export default withRouter(Sidebar);