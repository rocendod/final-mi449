import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';



function PokeCard() {
  const [poke, setPoke] = useState([]);
  
  useEffect(() => {
    async function Pokemon() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      console.log(data);
      setPoke(data.results); // Assuming the data structure is { results: [...] }
    }
    Pokemon();
  }, []);

  return (
    <>
    <h2>This Pokemon is:</h2>
      {poke.map((pokemon, index) => (
        <div key={index}>
          <h3>{pokemon.name}</h3>
          <a href={pokemon.url}>{pokemon.url}</a>
        </div>
      ))}
    </>
  )

}

function TypeFilter () {

  const [types, setType] = useState([]);
  useEffect(() => {
    async function Types() {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      console.log(data);
      setType(data.results); // Assuming the data structure is { results: [...] }
    }
    Types();
  }, []);

  return (
    <>
    <h3>Type:</h3>
    {types.map((type) =>
      <h3 class="bold">{type.name}</h3>
      )}
    </>
  )

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className="bg-gray-100"> Pokedex </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
      <TypeFilter />
        <PokeCard />
      </body>
    </div>
  );
}

export default App;

// Status 200 Orgin Error - is a secuirty error, server is concern that you are fetching third party data - Sever of third party could be miss configure - know as a cross domain error - -can disable cross-orgin restriction but don't leave it on. 
