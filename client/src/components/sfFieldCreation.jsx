import React, { Component } from 'react';
import LoginScreen from './loginScreen';
import FieldSelection from './fieldSelection';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ErrorMessage from './errorMessage';

class SfFieldCreation extends Component {

    state = {
        loggedIn : false,
        availableObjects : null,
        errorMessage : '',
        error : false
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
                    this.setState( { loggedIn: false });

                    console.log(`Error React: ${res.body}`);

                    this.setState( { errorMessage : res.body });
                    this.setState( { error : true });

                } else {
                    this.setState( { loggedIn: true, availableObjects : res.availableObjects });
                    this.setState( { error : false });

                    sessionStorage.setItem("state", JSON.stringify(this.state));
                }
                
            })            
            .catch( err => console.log('Error in React', err.body))
    }

    hideError = () => {
        this.setState( { error : false });
    }

    render() { 
        return (
            <>
                {this.state.error ?  <ErrorMessage onHideError={this.hideError} errorMessage={this.state.errorMessage} /> : null}
                <Router>
                    <Switch>
                        <Route exact path="/" >
                            {this.state.loggedIn ? <Redirect to="/fieldSelection" /> : <LoginScreen onAuthentication={this.handleAuthentication} /> }
                        </Route>
                        <Route path="/fieldSelection">
                            <FieldSelection availableObjects={this.state.availableObjects} />
                        </Route>
                    </Switch>
                </Router>
            </>
            
        );
    }
}
 
export default SfFieldCreation;