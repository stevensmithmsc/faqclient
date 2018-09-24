import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';

class SidebarItem extends Component {
    handleToggle() {
        this.props.toggle(this.props.item.id);
    }

    render() {
        if (!this.props.item.subs)
            return (
                <li>&ndash; <NavLink to={`${this.props.path}/${this.props.item.category}`}>{this.props.item.category}</NavLink></li>
            );
        else
            return (
                <React.Fragment>
                    <li>
                        <span onClick={this.handleToggle.bind(this)} className="clickable">{this.props.item.open ? "\u25bc" : "\u25b6"}</span>
                        <NavLink to={`${this.props.path}/${this.props.item.category}`}>{this.props.item.category}</NavLink>
                    </li>
                    <Collapse isOpen={this.props.item.open || this.props.selected.includes(this.props.item.category)}>
                        <ul className="secList">
                            {this.props.item.subs.map(c => <SidebarItem key={c.id} item={c} toggle={this.props.toggle} path={`${this.props.path}/${this.props.item.category}`} />)}
                        </ul>
                    </Collapse>
                </React.Fragment>
            );
    }
}


export default SidebarItem;