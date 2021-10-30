import React, { Component } from 'react'

class LoginScreen extends Component {
    
    render() { 
        return (
            <div>
                <form>
                    <div class="mb-3">
                        <input type="email" placeholder="Username" class="form-control" id="sf-username" aria-describedby="emailHelp"/>
                    </div>
                    <div class="mb-3">
                        <input type="password" placeholder="Password" class="form-control" id="sf-password"/>
                    </div>
                        <div class="mb-3">
                            <input type="token" placeholder="Token" class="form-control" id="sf-token"/>
                        </div>
                        <div class="mb-3">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="sf-production-check" value="sf-production"/>
                            <label class="form-check-label" for="Production">Production</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="sf-production-check" value="sf-sandbox"/>
                            <label class="form-check-label" for="Sandbox">Sandbox</label>
                        </div>
                    </div>
                    <button class="btn btn-primary" onClick={this.props.authenticate}>Authenticate</button>
                </form>
            </div>
        );
    }
}

// Function vs Class
// function LoginScreen(props) {
//     return (
//         <div>
//             <button class="btn btn-primary" onClick={props.authenticate}>Authenticate</button>
//         </div>
//     );
// }
 
export default LoginScreen;