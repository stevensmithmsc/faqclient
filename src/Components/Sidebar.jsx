import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import SidebarItem from './SidebarItem';

function Sidebar(props) {
    let selected = [];
    let sysStyle = "";
    if (props.location.pathname.split("/")[1] === "Category" || props.location.pathname.split("/")[1] === "NewCat") {
        selected = props.location.pathname.split("/").slice(2);
        const system = props.cats.find(s => s.categoryName === selected[0]);
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
                    .map(c => <SidebarItem key={c.id} item={c} toggle={props.toggle} path="/Category" selected={selected} />)}
            </ul>
            <br />
            {(props.canAdd && selected.length < 3)  ? <NavLink to={"/NewCat/" + selected.join("/")} className="btn btn-primary">New Category</NavLink> : ""}


            {(sysStyle && sysStyle !== "") ? <Helmet>
                <body className={sysStyle} />
            </Helmet> : "" }
        </div>
        );
}


export default withRouter(Sidebar);