'use strict';

function togglePokemon(input) {

	var myPokemonHeader = document.getElementById('pokemonHeader');
	if (input == 'top') {
		myPokemonHeader.innerHTML = 'Highest CP Pokémon';
	}
	else if (input =='favorite') {
		myPokemonHeader.innerHTML = 'Favorite Pokémon';
	}
	else if (input == 'IV') {
		myPokemonHeader.innerHTML = 'Top IV Pokémon';
	}

}

