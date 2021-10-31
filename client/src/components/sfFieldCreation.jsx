import React, { Component } from 'react';
import LoginScreen from './loginScreen';
import FieldSelection from './fieldSelection';

class SfFieldCreation extends Component {

    state = {

        conn : {}

    }

    handleAuthentication = (state) => {
        console.log('Authenticating...');

        fetch("/authenticate",  {
          method : 'POST',
          body : JSON.stringify(state),
          headers : { "Content-Type": "application/json" }
        })
        .then( (res) => res.json() )
        .then( (conn) => {
            
        })
    }

    render() { 
        return (<div>
            <LoginScreen onAuthentication={this.handleAuthentication} />
            <FieldSelection />
        </div>);
    }
}
 
export default SfFieldCreation;