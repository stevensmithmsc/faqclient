import React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function Map(props) {
    return (
            <Breadcrumb>                
                <BreadcrumbItem><NavLink exact to="/">Home</NavLink></BreadcrumbItem>
            {props.categories.length > 0 ? <BreadcrumbItem><NavLink exact to={`/Category/${props.categories[0]}`}>{props.categories[0]}</NavLink></BreadcrumbItem> : ""}
            {props.categories.length > 1 ? <BreadcrumbItem><NavLink exact to={`/Category/${props.categories[0]}/${props.categories[1]}`}>{props.categories[1]}</NavLink></BreadcrumbItem> : ""}
            {props.categories.length > 2 ? <BreadcrumbItem><NavLink exact to={`/Category/${props.categories[0]}/${props.categories[1]}/${props.categories[2]}`}>{props.categories[2]}</NavLink></BreadcrumbItem> : ""}
                <Route path="/Search/:keyword" render={(props) => <BreadcrumbItem>Search: {props.match.params.keyword}</BreadcrumbItem>} />
            </Breadcrumb>
            );
}

function mapStateToProps(state) {
    const categories = state.categories.current;
    return { categories };
}

export default connect(mapStateToProps)(Map);