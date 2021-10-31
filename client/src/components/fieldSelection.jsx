import React, { Component } from 'react';

class FieldSelection extends Component {


    fetchObjects = () => {

        console.log('etching');

        fetch("/selectObject",  {
            method : 'POST',
            // body : JSON.stringify(state),
            headers : { "Content-Type": "application/json" }
            })

    }    

    render() { 

        // this.fetchObjects();

        return (
            <div>
                {this.fetchObjects()} 
                <h1>Hello World!</h1>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>);
    }
}
 
export default FieldSelection;