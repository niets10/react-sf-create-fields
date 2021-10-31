import React, { Component } from 'react';

class FieldSelection extends Component {

    state = {
        availableObjects : null
    }

    constructor(props) {
        super(props);

        this.state.availableObjects = this.props.availableObjects;
    }

    render() { 
        return (
            <div>
                <ObjectOption availableObjects={this.state.availableObjects} />                
            </div>);
    }
}

function ObjectOption(props) {
    const options = props.availableObjects.map( (availableObject) => {
        return <option key="availableObject" value="availableObject">{availableObject}</option>
    })

    return (<select class="form-select" aria-label="Default select example">
                {options}
            </select>);
}
 
export default FieldSelection;