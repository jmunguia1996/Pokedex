const container: HTMLElement | any = document.getElementById("app");
const indexer: number = 100;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {
  for (let i = 0; i <= indexer; i++) {
    getPokemon(i);

  }
};

const getPokemon = async (iteration: number): Promise<void> => {
  const pokedexData: Response = await fetch(`https://pokeapi.co/api/v2/pokedex/national/`);
  const pokedex: any = await pokedexData.json();
  const pokeNumber: any = pokedex.pokemon_entries[iteration].entry_number;
  const pokemonInfo: any = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNumber);
  const pokemon: any = await pokemonInfo.json();
  console.log(pokemon.id);
  const pokemonType: any = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");
  
  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType
  };

  showPokemon(transformedPokemon);
};

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;
  container.innerHTML += output;
};

fetchData();