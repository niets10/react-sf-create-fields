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
                <select class="form-select" aria-label="Default select example">

                    {this.state.availableObjects.map(availableObject => {
                        return <option>{availableObject}</option>
                    })}
                </select>
                
            </div>);
    }
}



function ObjectOption() {
    const options = this.state.availableObjects.map( (availableObject) => {
        <option key="availableObject" value="availableObject">{availableObject}</option>
    })

    return (<select class="form-select" aria-label="Default select example">
                {options}
            </select>);
}
 
export default FieldSelection;