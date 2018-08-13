import React, { Component } from 'react';

class Footer extends Component {
    render() {
        var d = new Date();
        return (
            <div id="footer">
                    &copy; {d.getFullYear()} Pennine Care Health Informatics Department
            </div>
        );
    }
}

export default Footer;