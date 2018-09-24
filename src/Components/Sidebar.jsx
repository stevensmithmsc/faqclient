import React from 'react';
import { withRouter } from 'react-router-dom';
import SidebarItem from './SidebarItem';

function Sidebar(props) {
    let selected = [];
    if (props.location.pathname.split("/")[1] === "Category") {
        selected = props.location.pathname.split("/").slice(2);
    }   
    return (
        <div>
            <ul className="list-unstyled">
                {props.cats.map(c => <SidebarItem key={c.id} item={c} toggle={props.toggle} path="/Category" selected={selected} />)}
            </ul>
        </div>
        );
}


export default withRouter(Sidebar);