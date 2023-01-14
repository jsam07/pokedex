/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const TOTAL_POKEMON = 1000;
const RANDOM_POKEMON_COUNT = 20;
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

// TODO: wrap async blocks in try/catch
// TODO: document function

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

    return Array.from(urls);
};

export const fetchAllPokemon = async (urls) => {
    return Promise.all(
        urls.map(async (url) => {
            try {
                const { data } = await axios.get(url);
                return {
                    id: data.id,
                    name: data.name,
                    url: data.sprites.other.dream_world.front_default,
                };
            } catch (error) {
                return {};
            }
        })
    );
};

export const fetchRandomPokemon = async () => {
    const urls = generateRandomPokemonURLs(RANDOM_POKEMON_COUNT);
    const pokemon = await fetchAllPokemon(urls);

    return pokemon
        .filter((_pokemon) => _pokemon.id && _pokemon.url && _pokemon.name)
        .slice(0, 4);
};
