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
  // React.useEffect(() => {
  //   fetch("/api")
  //     .then( (res) => res.json())
  //     .then( (data) => setData(data.message) )
  // });


  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>{!data ? 'Loading...' : data}</p> */}
        <LoginScreen />
      </header>
    </div>
  );
}

export default App;
