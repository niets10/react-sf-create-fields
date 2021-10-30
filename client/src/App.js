import React from "react";
import logo from './logo.svg';
import './App.css';
import LoginScreen from "./components/loginScreen";

function App() {

  const [ data, setData ] = React.useState(null);

  const credentials = {
    username : 'agnieto00@gmail.com',
    password : 'myRandomPsd'
  };

  // Both backend and frontend need to be running in the terminal to fetch data
  React.useEffect(() => {
    fetch("/api")
      .then( (res) => res.json())
      .then( (data) => setData(data.message) )
  });

  const authenticate = () => {
    console.log('Authenticating...');
    fetch("/authenticate",  {
      method : 'POST',
      body : JSON.stringify(credentials),
      headers : { "Content-Type": "application/json" }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? 'Loading...' : data}</p>
        <LoginScreen authenticate={authenticate}/>
      </header>
    </div>
  );
}

export default App;
