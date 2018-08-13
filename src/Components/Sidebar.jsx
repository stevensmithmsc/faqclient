import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <ul>
                <li><NavLink to="/Category/General">General</NavLink></li>
                <li><NavLink to="/Category/FAQ App">FAQ App</NavLink></li>
                <Route path="/Category/FAQ App" render={() => <ul><li><NavLink to="/Category/FAQ App/New Question">New Question</NavLink></li><li><NavLink to="/Category/FAQ App/Search">Search</NavLink></li></ul>} />
            </ul>
            );
    }
}

export default Sidebar;