import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

function PokeCard() {
  const [poke, setPoke] = useState([]);
  
  useEffect(() => {
    async function Pokemon() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      console.log(data);
      setPoke(data.results); // Assuming the data structure is { results: [...] } This will likely need to change
    }
    Pokemon();
  }, []);

  return (
    <>
      {poke.map((pokemon, index) => (
        <div key={index}>
          <h2>This Pokemon is:</h2>
          <h3>{pokemon.name}</h3>
          <a href={pokemon.url}>{pokemon.url}</a>
        </div>
      ))}
    </>
  )

}

<ul className='grid grid-cols-3 gap-8 place-items-center'>
          {pokemonData.map((pokemon, index) => (
            <li className="bg-slate-50 flex flex-col rounded-2xl w-80 h-96 justify-center text-lg capitalize font-medium" key={index}>
            
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

return (
  <>
    <h3 className='m-5 text-2xl font-bold text-white'>Types:</h3>
    <div className='grid grid-rows-4 grid-flow-col justify-center gap-4'>
      {types.map((type) =>
        <p className="font-bold capitalize hover:bg-red-500 bg-slate-100 rounded-full w-40 h-10 text-xl text-center content-center">{type.name}</p>
        )}
    </div>
  </>
)

