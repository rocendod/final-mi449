import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function PokeCard() {

  const [getPoke, setPoke] = useState([]);

  async function Pokemon (){
    useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPoke(data);
        });
    })
  }

  return (
    <>
    {getPoke.map((pokemon) => (
      <>
      <h2>This Pokemon is:</h2>
      <h3>{pokemon.name}</h3>
      <a>{pokemon.url}</a>
      </>
    ))}
    </>
  )


}

function TypeFilter () {
  <>
  </>
}

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

        <h1>PokeDex</h1>
        <PokeCard />

      </header>
    </div>
  );
}

export default App;

// Satus 200 Orgin Error - is a secuirty error, server is concern that you are fetching third party data - Sever of third party could be miss configure - know as a cross domain error - -can disable cross-orgin restriction but don't leave it on. 
