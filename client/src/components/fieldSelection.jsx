import React, { Component } from 'react';

class FieldSelection extends Component {

    state = {
        availableObjects : null,
        selectedObject : '',
        selectedFile : null
    }

    constructor(props) {
        super(props);

        this.state.availableObjects = this.setAvailableObjects(this.props);
    }

    setAvailableObjects = (props) => {

        if (props.availableObjects === null) {
            const stateJSON = sessionStorage.getItem("state");

            const state = JSON.parse(stateJSON);            

            return state["availableObjects"];
        }

        return props.availableObjects;
    }

    createFields = () => {  
        
        console.log('SecFile ' + this.state.selectedFile.name);
    
        const formData = new FormData();
        formData.append( "myFile", this.state.selectedFile );
        formData.append( "selectedObject", this.state.selectedObject );

        fetch("/createFields",  {
            method : 'POST',
            body : formData
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

    onFileChange = (event) => {

        console.log('Selected file...');
        this.setState( { selectedFile : event.target.files[0] } );

    }

    render() { 
        return (
            <div>
                <ObjectOption onChangeObjectSelection={this.handleChangeObjectSelection} availableObjects={this.state.availableObjects} />                
                <div className="mb-3"> 
                    <input class="form-control" type="file" onChange={this.onFileChange} />                    
                </div> 
                <div>
                    <button class="btn btn-primary" onClick={this.createFields}>Create fields</button>
                </div>
                
            </div>);
    }
}

function ObjectOption(props) {
    const options = props.availableObjects.sort().map( (availableObject) => {
        return <option key={availableObject} value={availableObject} >{availableObject}</option>
    })

    return (<select onChange={props.onChangeObjectSelection} class="form-select mb-3" aria-label="Default select example">
                <option key="default" value="default" selected>Select an object from the list</option>
                {options}
            </select>);
}
 
export default FieldSelection;