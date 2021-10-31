import React, { Component } from 'react';
import LoginScreen from './loginScreen';
import FieldSelection from './fieldSelection';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class SfFieldCreation extends Component {

    state = {

        conn : null,
        loggedIn : true

    }

    handleAuthentication = (state) => {
        console.log('Authenticating...');

        fetch("/authenticate",  {
            method : 'POST',
            body : JSON.stringify(state),
            headers : { "Content-Type": "application/json" }
            })
            .then( (res) => res.json() )
            .then( (res) => {

                console.log('CONN: ' + JSON.stringify(res.body));

                if (res.error) {
                    this.setState( { loggedIn: false })
                } else {
                    this.setState( { loggedIn: false, conn: res.body })
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
                    <FieldSelection/>
                </Route>
            </Switch>
        </Router>);
    }
}
 
export default SfFieldCreation;