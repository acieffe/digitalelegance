function countdown(name) {
	let seconds = 11;
	function tick() {
		if (seconds > 0) {
			seconds--;
			document.getElementById('seconds').innerHTML = seconds;
			setTimeout(tick, 1000);
		} else {
			document.getElementById('egg-button').disabled = false;
			document.getElementById('info-button').style.display = 'block';
			document.getElementById('count-down').style.display = 'none';
			document.getElementById('egg-button').innerHTML = 'Again!';
			document.getElementById('pokemon-name').innerHTML = name;
		}
	}
	tick();
}

function run() {
	if (document.getElementById('egg-button').innerHTML == 'Hatch') {
		document.getElementById('egg-button').disabled = true;
		document.getElementById('info-button').style.display = 'none';
		document.getElementById('count-down').style.display = 'block';
		// Get a random number between 1 and 290
		let random = Math.floor(Math.random() * 905) + 1;
		// Get the pokemon with the random number
		getPokemon(random);
		// add breaking class to egg
		document.getElementById('egg-top').classList.add('breaking');
		document.getElementById('egg-left').classList.add('breaking');
		document.getElementById('egg-middle').classList.add('breaking');
		document.getElementById('egg-right').classList.add('breaking');
		document.getElementById('egg-bottom').classList.add('breaking');
		document.getElementById('pokemon-image').classList.add('growing');
	} else {
		document.getElementById('info-button').style.display = 'none';
		document.getElementById('count-down').style.display = 'block';
		document.getElementById('egg-button').innerHTML = 'Hatch';
		document.getElementById('seconds').innerHTML = 10;
		document.getElementById('pokemon-name').innerHTML = '';
		document.getElementById('pokemon-image').innerHTML = '';
		//remove class from egg
		document.getElementById('egg-top').classList.remove('breaking');
		document.getElementById('egg-left').classList.remove('breaking');
		document.getElementById('egg-middle').classList.remove('breaking');
		document.getElementById('egg-right').classList.remove('breaking');
		document.getElementById('egg-bottom').classList.remove('breaking');
		document.getElementById('pokemon-image').classList.remove('growing');
	}
}

function toggleInfo() {
	let info = document.getElementById('pokemon-info').style;
	if (info.display === 'none') {
		info.display = 'flex';
	} else {
		info.display = 'none';
	}
}

const pokemons_container = document.getElementById('pokemon-stats');
const colors = {
	bug: '#A8B820',
	dark: '#705848',
	dragon: '#7038F8',
	electric: '#F8D030',
	fairy: '#F0B6BC',
	fighting: '#C03028',
	fire: '#F08030',
	flying: '#A890F0',
	ghost: '#705898',
	grass: '#78C850',
	ground: '#E0C068',
	ice: '#98D8D8',
	normal: '#A8A878',
	poison: '#A040A0',
	psychic: '#F85888',
	rock: '#B8A038',
	steel: '#B8B8D0',
	water: '#6890F0',
};
const main_types = Object.keys(colors);

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonInfo(pokemon);
};

function createPokemonInfo(pokemon) {
	let pokemonInnerHTML = ``;
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const id = pokemon.id.toString().padStart(3, '0');
	const poke_types = pokemon.types.map((el) => el.type.name);
	console.log(poke_types);
	const type = main_types.find((type) => poke_types.indexOf(type) > -1);
	const color = colors[type];
	const height = (pokemon.height / 10) * 3.28;
	const weight = (pokemon.weight / 10) * 2.2;
	const image = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" />`;

	pokemonInnerHTML = `
            <div class="pokemon-name">
               <h2 id="pokemon-name">${name}</h2>
            </div>
            <div class="pokemon-img">
               ${image}
            </div>
            <div class="pokemon-info">
               <p id="pokemon-info">
                  <span class="number">#${id}</span>
                  <table>
                     <tr>
                     <td>Type:</td>
                     <td class="pokemon-type">${type}</td>
                     </tr>
                     <tr>
                     <td>Height:</td>
                     <td>${height.toFixed(2)} Feet</td>
                     </tr>
                     <tr>
                     <td>Weight:</td>
                     <td>${weight.toFixed(2)} Pounds</td>
                     </tr>
                  </table>
               </p>
            </div>
   `;
	pokemons_container.innerHTML = pokemonInnerHTML;
	document.getElementById('pokemon-image').innerHTML = image;
	document.getElementById('egg-top').style.fill = color;
	document.getElementById('egg-left').style.fill = color;
	document.getElementById('egg-middle').style.fill = color;
	document.getElementById('egg-right').style.fill = color;
	document.getElementById('egg-bottom').style.fill = color;
	document.getElementById('pokemon-stats').style.backgroundColor = color;
	countdown(name);
}
