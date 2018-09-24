import React from 'react';

function Footer() {
    var d = new Date();
    return (
        <div id="footer">
                &copy; {d.getFullYear()} Pennine Care Health Informatics Department
        </div>
    );
}

export default Footer;