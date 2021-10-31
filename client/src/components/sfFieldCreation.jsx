import React, { Component } from 'react';
import LoginScreen from './loginScreen';
import FieldSelection from './fieldSelection';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class SfFieldCreation extends Component {

    state = {
        loggedIn : false,
        availableObjects : null
    }

    handleAuthentication = (loginScreenState) => {
        console.log('Authenticating...');

        fetch("/authenticate",  {
            method : 'POST',
            body : JSON.stringify(loginScreenState),
            headers : { "Content-Type": "application/json" }
            })
            .then( (res) => res.json() )
            .then( (res) => {

                if (res.error) {
                    this.setState( { loggedIn: false })
                } else {
                    this.setState( { loggedIn: true, availableObjects : res.availableObjects })
                }
                
            })            
            .catch( err => console.log('Error in React', err.body))
    }

    render() { 
        return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    {this.state.loggedIn ? <Redirect to="/fieldSelection" /> : <LoginScreen onAuthentication={this.handleAuthentication} /> }
                </Route>
                <Route path="/fieldSelection">
                    <FieldSelection availableObjects={this.state.availableObjects} />
                </Route>
            </Switch>
        </Router>);
    }
}
 
export default SfFieldCreation;