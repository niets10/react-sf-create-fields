import React, { Component } from 'react'

class LoginScreen extends Component {
    
    render() { 
        return (
            <div>
                <button class="btn btn-primary" onClick={this.props.authenticate}>Authenticate</button>
            </div>
        );
    }
}
 
export default LoginScreen;