import './App.css';
import { useState, useEffect} from 'react';

function SearchBar({ setPokeTerm }) {
  const handleChange = event => {
    setPokeTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder=" Search Pokemon..."
      onChange={handleChange}
      className="m-4 p-2 w-80 rounded-full border-2 border-gray-300 focus:border-red-500 focus:outline-none"
    />
  );
}
///creating the component & desgin of a search bar to look for a Pokemon and their stats

function TypeFilter () {

  const [types, setType] = useState([]);

  useEffect(() => {
    async function Types() {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setType(data.results);
    }
    Types();
  }, []);
/// retrieving the types from the Pokeapi to display
  return (
    <body className='m-20'>
      <h3 className='m-5 text-4xl font-bold text-white'>Types:</h3>
      <div className='flex place-items-center grid grid-rows-4 sm:grid-cols-2 md:grid-cols-5 justify-center gap-4'>
        {types.map((type) =>
          <p className="font-bold capitalize hover:bg-red-500 bg-slate-100 rounded-full w-40 h-10 text-xl text-center content-center">{type.name}</p>
          )}
      </div>
    </body>
  )

}
///Displaying types

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setPokeTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = await response.json();
        const pokemons = data.results;

        const promises = pokemons.map(async pokemon => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            types: pokemonData.types.map(type => type.type.name),
            stats: pokemonData.stats.map(stat => ({
              name:stat.stat.name,
              base_stat: stat.base_stat
            }))
          };
        });

        const results = await Promise.all(promises);
        setPokemonData(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
/// fetching the data for the name, image, type, and stats of the pokemon, using promises
  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='m-20 inline-block'>
      <SearchBar setPokeTerm={setPokeTerm} />
      <h1 className='m-14 text-white font-bold text-6xl underline'>Pokemons</h1>
      <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex justify-evenly place-items-center'>
              {filteredPokemon.map((pokemon, index) => (
                <li 
                className="bg-slate-50 hover:bg-red-500 flex flex-col rounded-2xl w-80 h-96 justify-center text-lg capitalize font-medium" key={index}>
                  <img className='h-48 w-48 place-self-center' src={pokemon.image} alt={pokemon.name} />
                  <div>
                    <strong className='text-yellow-400'>Name:</strong> {pokemon.name}
                  </div>

                  <div>
                    <strong className='text-yellow-400'>Types:</strong> {pokemon.types.join(', ')}
                  </div>

                  <div>
                    <strong className='text-yellow-400'>Pokemon Stats: </strong>
                    {pokemon.stats.map((stat, index) => (
                      <span key={index}>{stat.name} - {stat.base_stat} </span>
                    ))}
                  </div>
          
                </li>
              ))}
            </ul>
    </div>
  );
}
/// displaying all data that was fetch and using filtering what is serched from the data of poke


function App() {
  return (
      <div className="App">

        <header className="align items-center">
          <h1 className="bg-red-500 text-6xl font-bold text-white p-5"> Pokedex Stats</h1>
        </header>

        <body className="App-body bg-neutral-800 flex flex-col place-items-center ">
          <TypeFilter/>
          <PokemonList/>
        </body>

        <footer className='bg-red-500 text-white font-medium text-lg'>
          <p>Created By: David Rocendo</p>
          <p>Contact Information: rocendod@msu.edu</p>
          <p>API Used: <a className="text-yellow-400" href="https://pokeapi.co/">PokeAPI</a> </p>
        </footer>

      </div>
  );
}
/// simple html inside app that formats the componets for the user creating a place where you can search for pokemon stats

export default App;

// Status 200 Orgin Error - is a secuirty error, server is concern that you are fetching third party data - Sever of third party could be miss configure - know as a cross domain error - -can disable cross-orgin restriction but don't leave it on. Will need a proxy server - 
