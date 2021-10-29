import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [ data, setData ] = React.useState(null);

  // Both backend and frontend need to be running in the terminal to fetch data
  React.useEffect(() => {
    fetch("/bye")
      .then( (res) => res.json())
      .then( (data) => setData(data.message) )
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? 'Loading...' : data}</p>
      </header>
    </div>
  );
}

export default App;
