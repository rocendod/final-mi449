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