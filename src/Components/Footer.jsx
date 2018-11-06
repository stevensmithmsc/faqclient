import React from 'react';

function Footer(props) {
    var d = new Date();
    return (
        <div id="footer">
            &copy; {d.getFullYear()} Pennine Care Health Informatics Department
            <span className="float-right">{props.username}</span>
        </div>
    );
}

export default Footer;