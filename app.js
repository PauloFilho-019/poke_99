const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const pokelist = document.getElementById("pokeList");
const fetchPokemon = () => {
  const pokemonPromisses = [];

  for (let i = 1; i <= 151; i++) {
    pokemonPromisses.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }
  Promise.all(pokemonPromisses).then((pokemons) => {
    const lisPoke = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      accumulator += `<tr><th onclick="info()">${pokemon.id}. ${
        pokemon.name
      }</th></tr><tr>
        <td >${pokemon.types
          .map((typeInfo) => typeInfo.type.name)
          .join(" | ")}</td></tr>`;
      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = lisPoke;
  });
};
function info() {
  alert(
    "isso aqui vai ser um popup com peso, altura, descrição e evolucção do pokemon"
  );
}
fetchPokemon();
