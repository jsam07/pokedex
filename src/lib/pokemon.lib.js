/* eslint-disable no-prototype-builtins */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import {
    ALL_POKEMON_API_URL,
    POKEMON_API_URL,
    POKEMON_SPECIES_API_URL,
    RANDOM_POKEMON_FETCH_COUNT,
    RANDOM_POKEMON_RENDER_COUNT,
    TOTAL_POKEMON,
} from '@/constants';
import { capitalize, generateRandomNumber } from './common.lib';

/**
 * Generates count number of random integers between 1 and 1008.
 * @param {number} count The number of random numbers to generate.
 * @returns An array of the generated numbers.
 */
export const generateRandomPokemonURLs = (count) => {
    const urls = new Set();

    while (urls.size < count) {
        const id = generateRandomNumber(1, TOTAL_POKEMON);
        const pokemon = `${POKEMON_API_URL}/${id}`;

        urls.add(pokemon);
    }

    return Array.from(urls);
};

/**
 * Extracts the name of each type the pokemon belongs to.
 * @param {object[]} types Pokemon type metadata for a given pokemon.
 * @returns An array containing the types for a given pokemon.
 */
const extractPokemonTypes = (types) => {
    return types.map((type) => type.type.name);
};

/**
 * Extracts the name and score for each stat of a given pokemon.
 * Stats are: HP, Attack, Defense, Special-Attack, Special-Defense, and Speed.
 * @param {object[]} stats Stats metadata for a given pokemon.
 * @returns An array of objects containing the name and corresponding score for each stat.
 */
const extractPokemonStats = (stats) => {
    return stats.map((stat) => {
        return {
            name: stat.stat.name,
            score: stat.base_stat,
        };
    });
};

/**
 * Extracts the name of each ability for a given pokemon.
 * @param {object[]} abilities Metadata about the abilities a given pokemon has.
 * @returns An array of the named abilities for the given pokemon.
 */
const extractPokemonAbilities = (abilities) => {
    return abilities.map((ability) => ability.ability.name.replace('-', ' '));
};

/**
 * Fetches the description for a given pokemon using the provided id.
 * @param {number} id The unique-identifier for pokemon.
 * @param {string} name The name of the pokemon.
 * @returns The description summary of the given pokemon.
 */
const fetchPokemonDescription = async (id, name) => {
    const url = `${POKEMON_SPECIES_API_URL}/${id}`;

    try {
        const re = new RegExp(name, 'ig');
        const { data } = await axios.get(url);
        const entries = data.flavor_text_entries;
        const entry = entries.find((_entry) => _entry.language.name === 'en');

        const description = entry.flavor_text
            .replace(re, name)
            .replace('\n', ' ')
            .replace('POKéMON', 'Pokémon')
            .replace('\x0c', ' ');

        return description;
    } catch (error) {
        return '';
    }
};

/**
 * Fetches details for a given pokemon using the given endpoint.
 * @param {string} url The endpoint to query for pokemon details.
 * @returns An object containing pokemon details, such as name, height, abilities, etc.
 */
const fetchPokemonDetailsFromURL = async (url) => {
    try {
        const { data } = await axios.get(url);
        let { name, height, weight } = data;

        name = capitalize(name);
        height /= 10; // decimeters -> meters
        weight /= 10; // hectograms -> kilograms

        const { id, types, stats, abilities } = data;
        const description = await fetchPokemonDescription(id, name);

        return {
            id,
            name,
            height,
            weight,
            description,
            stats: extractPokemonStats(stats),
            types: extractPokemonTypes(types),
            abilities: extractPokemonAbilities(abilities),
            url: data.sprites.other.dream_world.front_default,
        };
    } catch (error) {
        return {};
    }
};

/**
 * Fetches the details for all pokemon. This used for caching and generating the Trie for auto-complete search.
 * @returns An array of the details of each of the requested pokemon.
 */
// eslint-disable-next-line no-unused-vars
const fetchAllPokemon = async () => {
    try {
        const { data } = await axios.get(ALL_POKEMON_API_URL);
        const pokemon = data.results;

        return Promise.all(
            pokemon.map(async (_pokemon) => {
                try {
                    return await fetchPokemonDetailsFromURL(_pokemon.url);
                } catch (error) {
                    return {};
                }
            }),
        );
    } catch (error) {
        return [];
    }
};

/**
 * Fetches the details for the given randomly generated pokemon urls.
 * @param {string[]} urls The endpoints to query for pokemon details.
 * @returns An array of the details of each of the requested pokemon.
 */
export const fetchAllRandomPokemon = async (urls) => {
    return Promise.all(
        urls.map(async (url) => {
            try {
                return fetchPokemonDetailsFromURL(url);
            } catch (error) {
                return {};
            }
        }),
    );
};

/**
 * Fetches details for a given pokemon using the given id.
 * @param {number} id The unique-identifier for pokemon.
 * @returns An object containing pokemon details, such as name, height, abilities, etc.
 */
export const fetchPokemonDetailsFromID = async (id) => {
    try {
        const url = `${POKEMON_API_URL}/${id}`;
        return fetchPokemonDetailsFromURL(url);
    } catch (error) {
        return {};
    }
};

/**
 * Fetches some random pokemon.
 * Removes pokemon with no id, url, or name.
 * @returns Array of randoms generated pokemon with relevant details (id, name, image url).
 */
export const fetchRandomPokemon = async () => {
    try {
        const urls = generateRandomPokemonURLs(RANDOM_POKEMON_FETCH_COUNT);
        const pokemon = await fetchAllRandomPokemon(urls);

        return pokemon
            .filter((_pokemon) => _pokemon.id && _pokemon.url && _pokemon.name)
            .slice(0, RANDOM_POKEMON_RENDER_COUNT);
    } catch (error) {
        return [];
    }
};
