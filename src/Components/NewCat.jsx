import React, { Component } from 'react';
import { Button } from 'reactstrap';

class NewCat extends Component {
    render() {
        return (
            <div>
                <h2>New Category</h2>
                <hr />
                <p>Parent Category: xxxxx</p>
                <div className="form-group">
                    <label htmlFor="newCat">New Category:</label>
                    <input type="text" className="form-control" id="newCat" placeholder="Please enter the category name." />
                </div> 
                <Button>Save</Button>

            </div>
            );       
    }
}

export default NewCat;