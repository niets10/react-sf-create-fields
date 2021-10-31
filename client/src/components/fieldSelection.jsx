import React, { Component } from 'react';

class FieldSelection extends Component {

    state = {
        availableObjects : null,
        selectedObject : ''
    }

    constructor(props) {
        super(props);

        this.state.availableObjects = this.props.availableObjects;
    }

    createFields = () => {    

        fetch("/createFields",  {
            method : 'POST',
            body : JSON.stringify(this.state),
            headers : { "Content-Type": "application/json" }
        })
        .then( (res) => res.json() )
        .then( (res) => {
            console.log('Success creating fields...');  
        })            
        .catch( err => console.log('Error in React', err.body));            
    }

    handleChangeObjectSelection = (event) => {
        this.setState( { selectedObject : event.target.value})
    };

    render() { 
        return (
            <div>
                <ObjectOption onChangeObjectSelection={this.handleChangeObjectSelection} availableObjects={this.state.availableObjects} />                
                <button class="btn btn-primary" onClick={this.createFields}>Create fields</button>
            </div>);
    }
}

function ObjectOption(props) {
    const options = props.availableObjects.map( (availableObject) => {
        return <option key={availableObject} value={availableObject} >{availableObject}</option>
    })

    return (<select onChange={props.onChangeObjectSelection} class="form-select mb-3" aria-label="Default select example">
                <option key="default" value="default" selected>Select an object from the list</option>
                {options}
            </select>);
}
 
export default FieldSelection;