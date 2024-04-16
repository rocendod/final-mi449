import './App.css';
import { useState, useEffect, useRef } from 'react';

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
      <h3 className='m-5 text-2xl font-bold'>Type:</h3>
      <div className='grid grid-rows-4 grid-flow-col justify-center gap-4'>
        {types.map((type) =>
          <p className="font-bold bg-slate-100 rounded-full w-40 h-10 text-xl text-center">{type.name}</p>
          )}
      </div>
    </>
  )

}

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=18');
        const data = await response.json();
        const pokemons = data.results;

        const promises = pokemons.map(async pokemon => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            types: pokemonData.types.map(type => type.type.name)
          };
        });

        const results = await Promise.all(promises);
        setPokemonData(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // empty dependency array to run effect only once

  return (
    <body className='m-10'>
      <h1 className='m-10 font-bold text-4xl'>Pokemon</h1>
      <div className=''>
        <ul className='grid grid-cols-3 gap-8 place-items-center'>
          {pokemonData.map((pokemon, index) => (
            <li className="bg-red-600 flex flex-col rounded-lg w-80 h-96 justify-center" key={index}>
            
              <img src={pokemon.image} alt={pokemon.name} />
              <div>
                <strong>Name:</strong> {pokemon.name}
              </div>
              <div>
                <strong>Types:</strong> {pokemon.types.join(', ')}
              </div>
      
            </li>
          ))}
        </ul>
      </div>
    </body>
  );
}


function App() {
  return (
    <div className="App ">
      <header className="align items-center">
        <h1 className="bg-red-700 text-5xl font-bold text-white p-5"> Pokedex </h1>

      </header>
      <body className="App-body bg-white-300 flex flex-col justify-center justify-items-center ">
        <nav>
        </nav>
        <TypeFilter />
        <PokemonList/>
      </body>
    </div>
  );
}

export default App;

// Status 200 Orgin Error - is a secuirty error, server is concern that you are fetching third party data - Sever of third party could be miss configure - know as a cross domain error - -can disable cross-orgin restriction but don't leave it on. Will need a proxy server - 
