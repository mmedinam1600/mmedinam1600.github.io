
const formSearch = document.getElementById('search-form');
const randomPokemon = document.getElementById('random-pokemon');
const BASE_URL = "https://pokeapi.co/api/v2/";


async function showDefaultPokemon() {
  const apiFetch = new Fetch();
  const data = await apiFetch.getData(`${BASE_URL}pokemon/pikachu`);
  if(data.error) {
    alert(data.error);
  } else {
    resetValues();
    fillPokemonInfo(data);
  }
}
showDefaultPokemon();

formSearch.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const pokemon = document.getElementById('search-pokemon').value.toLowerCase();
    const data = await makeFetch(`${BASE_URL}pokemon/${pokemon}`);
    if(data.error) {
      alert(data.error);
    } else {
      resetValues();
      fillPokemonInfo(data);
    }
  } catch (e) {
    console.log("Error inesperado");
  }
});

randomPokemon.addEventListener('click', async (event) => {
  const idPokemon = Math.floor(Math.random() * 898);
  const data = await makeFetch(`${BASE_URL}pokemon/${idPokemon}`);
  if(data.error) {
    alert(data.error);
  } else {
    resetValues();
    fillPokemonInfo(data);
  }
});

async function makeFetch(url) {
  const apiFetch = new Fetch();
  return apiFetch.getData(url);
}

function fillPokemonInfo(data) {
  const pokemonImageElement = document.getElementById('pokemon-image');
  const pokemonNameElement = document.getElementById('pokemon-name');
  const types = document.getElementById('types');
  const elementsTypes = createElementType(data.types);
  const weight = document.getElementById('weight-pokemon');
  const height = document.getElementById('height-pokemon');
  const abilities = document.getElementById('abilities-pokemon');
  const elementsAbilities = createElementAbilities(data.abilities);
  const hpBars = document.getElementsByClassName('hp-bar');
  const attackBar = document.getElementsByClassName('attack-bar');
  const defenseBar = document.getElementsByClassName('defense-bar');
  const sAttackBar = document.getElementsByClassName('special-attack-bar');
  const sDefenseBar = document.getElementsByClassName('special-defense-bar');
  const speedBar = document.getElementsByClassName('speed-bar');
  const move = document.getElementById('move');

  elementsAbilities.forEach(elementAbility => {
    abilities.appendChild(elementAbility);
  });
  elementsTypes.forEach(elementType => {
    types.appendChild(elementType);
  });
  weight.innerHTML = `${data.weight/10} kg.`;
  height.innerHTML = `0.${data.height} m.`;
  pokemonNameElement.innerHTML = `${data.name}`;
  pokemonImageElement.src = `${data.sprites.other.home.front_default}`;
  move.innerHTML = `${data.moves[0].move.name}, ${data.moves[1].move.name}, ${data.moves[2].move.name}`
  renderBars(hpBars, data.stats[0].base_stat);
  renderBars(attackBar, data.stats[1].base_stat);
  renderBars(defenseBar, data.stats[2].base_stat);
  renderBars(sAttackBar, data.stats[3].base_stat);
  renderBars(sDefenseBar, data.stats[4].base_stat);
  renderBars(speedBar, data.stats[5].base_stat);
}

function renderBars(elementsStats, baseStat) {
  if(baseStat >= 150) {
    baseStat = 140;
  }
  for( let i = 0 ; i <= baseStat/10 ; i++) {
    elementsStats[elementsStats.length-1-i].className += " active-bar";
  }
}

function createElementAbilities(abilities) {
  const elements = [];
  abilities.forEach( ability => {
    if(!ability.is_hidden) {
      const label = document.createElement('span');
      label.className = `ability-pokemon`;
      label.innerHTML = `${ability.ability.name}`;
      elements.push(label);
    }
  });
  return elements;
}

function createElementType(types) {
  const elements = [];
  types.forEach( type => {
    const label = document.createElement('span');
    label.className = `label ${type.type.name}`;
    label.innerHTML = `${type.type.name}`;
    elements.push(label);
  });
  return elements;
}

function resetValues() {
  const types = document.getElementById('types');
  const inputPokemon = document.getElementById('search-pokemon');
  const abilities = document.getElementById('abilities-pokemon');
  const hpBars = document.getElementsByClassName('hp-bar');
  const attackBar = document.getElementsByClassName('attack-bar');
  const defenseBar = document.getElementsByClassName('defense-bar');
  const sAttackBar = document.getElementsByClassName('special-attack-bar');
  const sDefenseBar = document.getElementsByClassName('special-defense-bar');
  const speedBar = document.getElementsByClassName('speed-bar');


  for( let i = 0 ; i < 15 ; i++) {
    hpBars[i].classList.remove('active-bar');
    attackBar[i].classList.remove('active-bar');
    defenseBar[i].classList.remove('active-bar');
    sAttackBar[i].classList.remove('active-bar');
    sDefenseBar[i].classList.remove('active-bar');
    speedBar[i].classList.remove('active-bar');
  }
  types.innerHTML = "";
  inputPokemon.value = "";
  abilities.innerHTML = "";
}