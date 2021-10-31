import React from "react";
import logo from './logo.svg';
import './App.css';
import SfFieldCreation from "./components/sfFieldCreation";

function App() {


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
        <SfFieldCreation />
      </header>
    </div>
  );
}

export default App;
