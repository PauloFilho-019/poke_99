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
        <td>${pokemon.types
          .map((typeInfo) => typeInfo.type.name)
          .join(" | ")}</td></tr>`;
      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = lisPoke;
  });
};
function info() {
  document.getElementById("popup").style.display = "block";
}
function close() {
  document.getElementById("popup").style.display = "none";
}
fetchPokemon();

window.onload = function () {
  Dragable(document.getElementById("popup"));
};

//Adiciona eventos pra navegadores modernos e antigos
function addEvent(el, type, callback) {
  if (el.addEventListener) {
    el.addEventListener(type, callback);
  } else if (el.attachEvent) {
    el.attachEvent("on" + type, callback);
  }
}

function Dragable(el) {
  var isMove = false, //Verifica se esta se movendo
    x = 0,
    y = 0, //Pega as coordenadas do mouse
    xel = 0,
    yel = 0; // ultima posição do elemento

  addEvent(el, "mousedown", function (e) {
    isMove = true;

    el.className += " isMoving";

    x = window.event ? window.event.clientX : e.pageX;
    y = window.event ? window.event.clientY : e.pageY;

    xel = x - el.offsetLeft;
    yel = y - el.offsetTop;
  });

  addEvent(document, "mousemove", function (e) {
    if (isMove) {
      e.preventDefault();

      x = window.event ? window.event.clientX : e.pageX;
      y = window.event ? window.event.clientY : e.pageY;

      el.style.left = x - xel + "px";
      el.style.top = y - yel + "px";
    }
  });

  addEvent(document, "mouseup", function () {
    el.className = String(el.className).replace(/(^|\s)isMoving(\s|$)/g, " ");
    isMove = false;
  });
}
