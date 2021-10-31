import React, { Component } from 'react';




class LoginScreen extends Component {

    constructor(props) {

        super(props);

        this.state = {
            username : "",
            password : "",
            token: "",
            environment: ""
        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    // authenticate = () => {
    //     console.log('Authenticating...');

    //     fetch("/authenticate",  {
    //       method : 'POST',
    //       body : JSON.stringify(this.state),
    //       headers : { "Content-Type": "application/json" }
    //     })
    //     .then( (res) => res.json() )
    //     .then( (conn) => {
            
    //     })
    // }
        
    render() { 
        return (
            <div>
                {/* <form> */}
                    <div class="mb-3">
                        <input type="email" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" class="form-control" id="sf-username" aria-describedby="emailHelp"/>
                    </div>
                    <div class="mb-3">
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" class="form-control" id="sf-password"/>
                    </div>
                    <div class="mb-3">
                        <input type="token" name="token" value={this.state.token} onChange={this.handleChange} placeholder="Token" class="form-control" id="sf-token"/>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="environment" id="sf-production-check" checked={this.state.environment === "sf-production"} onChange={this.handleChange} value="sf-production"/>
                            <label class="form-check-label" for="Production">Production</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="environment" id="sf-sandbox-check" checked={this.state.environment === "sf-sandbox"} onChange={this.handleChange} value="sf-sandbox"/>
                            <label class="form-check-label" for="Sandbox">Sandbox</label>
                        </div>
                    </div>
                    <button class="btn btn-primary" onClick={() => this.props.onAuthentication(this.state)}>Authenticate</button>
                {/* </form> */}
            </div>
        );
    }
}

// Function vs Class
// function LoginScreen(props) {
//     return (
//         <div>
//             <form>
//                 <div class="mb-3">
//                     <input type="email" placeholder="Username" class="form-control" id="sf-username" aria-describedby="emailHelp"/>
//                 </div>
//                 <div class="mb-3">
//                     <input type="password" placeholder="Password" class="form-control" id="sf-password"/>
//                 </div>
//                     <div class="mb-3">
//                         <input type="token" placeholder="Token" class="form-control" id="sf-token"/>
//                     </div>
//                     <div class="mb-3">
//                     <div class="form-check form-check-inline">
//                         <input class="form-check-input" type="radio" name="inlineRadioOptions" id="sf-production-check" value="sf-production"/>
//                         <label class="form-check-label" for="Production">Production</label>
//                     </div>
//                     <div class="form-check form-check-inline">
//                         <input class="form-check-input" type="radio" name="inlineRadioOptions" id="sf-production-check" value="sf-sandbox"/>
//                         <label class="form-check-label" for="Sandbox">Sandbox</label>
//                     </div>
//                 </div>
//                 <button onClick={getInfo}>Get info</button>
//                 <button class="btn btn-primary" onClick={props.authenticate}>Authenticate</button>
//             </form>
//         </div>
//     );
// }
 
export default LoginScreen;