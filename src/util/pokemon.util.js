/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const TOTAL_POKEMON = 1000;
const RANDOM_POKEMON_COUNT = 4;
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomPokemonURLs = (count) => {
    const urls = new Set();

    while (urls.size < count) {
        const id = generateRandomNumber(1, TOTAL_POKEMON);
        const pokemon = `${POKEMON_API_URL}/${id}`;

        urls.add(pokemon);
    }

    return urls;
};

export const fetchAllPokemon = async (urls) => {
    return Promise.all(
        urls.map(async (url) => {
            const { data } = await axios.get(url);
            return {
                name: data.name,
                url: data.sprites.other.dream_world.front_default,
            };
        })
    );
};

export const generateRandomPokemon = async () => {
    const urls = generateRandomPokemonURLs(RANDOM_POKEMON_COUNT);
    const pokemon = await fetchAllPokemon(urls);

    return pokemon;
};
