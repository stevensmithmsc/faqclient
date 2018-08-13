import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Map extends Component {
    render() {
        return (
            <Breadcrumb>                
                <BreadcrumbItem><NavLink exact to="/">Home</NavLink></BreadcrumbItem>
                <Route path="/Category/:cat" render={(props) => <BreadcrumbItem><NavLink exact to={`/Category/${props.match.params.cat}`}>{props.match.params.cat}</NavLink></BreadcrumbItem>} />
                <Route path="/Category/:cat/:sub" render={(props) => <BreadcrumbItem><NavLink exact to={`/Category/${props.match.params.cat}/${props.match.params.sub}`}>{props.match.params.sub}</NavLink></BreadcrumbItem>} />
                <Route path="/Category/:cat/:sub/:third" render={(props) => <BreadcrumbItem><NavLink exact to={`/Category/${props.match.params.cat}/${props.match.params.sub}/${props.match.params.third}`}>{props.match.params.third}</NavLink></BreadcrumbItem>} />
                <Route path="/Search/:keyword" render={(props) => <BreadcrumbItem>Search: {props.match.params.keyword}</BreadcrumbItem>} />
            </Breadcrumb>
            );
    }
}

export default Map;