import React, { Component } from 'react';

class FieldSelection extends Component {

    state = {
        availableObjects : null
    }

    componentDidMount() {     
        this.fetchObjects();
    } 

    fetchObjects = () => {
        console.log('Fetching');

        fetch("/selectObject",  {
            method : 'POST',
            headers : { "Content-Type": "application/json" }
        })
        .then( (res) => res.json())
        .then( (data) => {
            console.log('Data: ', JSON.stringify(data));
            this.setState( { availableObjects : data })
        });
    }
    
    render() { 
        return (
            <div>
                
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