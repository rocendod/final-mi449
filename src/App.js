import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with Davi!
        </a>
      </header>
    </div>
  );
}

export default App;

// Satus 200 Orgin Error - is a secuirty error, server is concern that you are fetching third party data - Sever of third party could be miss configure - know as a cross domain error - -can disable cross-orgin restriction but don't leave it on. 
