/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import { allPokemon } from '@/data/pokemon.raw';
import { pokemonTrie } from '@/data/pokemon.trie';

import { capitalize, generateRandomNumber } from './common.util';
import {
    ALL_POKEMON_API_URL,
    POKEMON_API_URL,
    POKEMON_SPECIES_API_URL,
    RANDOM_POKEMON_FETCH_COUNT,
    RANDOM_POKEMON_RENDER_COUNT,
    TOTAL_POKEMON,
} from '@/constants';

// TODO: wrap async blocks in try/catch
// TODO: document function
// TODO: refactor misc helper methods (duplicate of capi)

export const generateRandomPokemonURLs = (count) => {
    const urls = new Set();

    while (urls.size < count) {
        const id = generateRandomNumber(1, TOTAL_POKEMON);
        const pokemon = `${POKEMON_API_URL}/${id}`;

        urls.add(pokemon);
    }

    return Array.from(urls);
};

const extractPokemonTypes = (slots) => {
    return slots.map((slot) => slot.type.name);
};

const extractPokemonStats = (stats) => {
    return stats.map((stat) => {
        return {
            name: stat.stat.name,
            score: stat.base_stat,
        };
    });
};

const extractPokemonAbilities = (abilities) => {
    return abilities.map((ability) => ability.ability.name.replace('-', ' '));
};

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

const fetchPokemonDetailsFromURL = async (url) => {
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
};

export const fetchPokemonDetailsFromID = async (id) => {
    const url = `${POKEMON_API_URL}/${id}`;
    return fetchPokemonDetailsFromURL(url);
};

const fetchAllRandomPokemon = async (urls) => {
    return Promise.all(
        urls.map(async (url) => {
            try {
                return await fetchPokemonDetailsFromURL(url);
            } catch (error) {
                return {};
            }
        })
    );
};

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
            })
        );
    } catch (error) {
        return [];
    }
};

const generateTrie = (pokemon) => {
    const trie = {};

    pokemon.forEach((_pokemon) => {
        let curr = trie;

        for (let char of _pokemon.name) {
            char = char.toLowerCase();
            if (!curr.hasOwnProperty(char)) {
                curr[char] = {};
            }
            curr = curr[char];
        }

        curr.match = {
            id: _pokemon.id,
            name: _pokemon.name,
            url: _pokemon.url,
            types: _pokemon.types,
        };
    });

    return trie;
};

const navigateToNode = (trie, searchText) => {
    let curr = trie;

    for (const char of searchText) {
        if (!curr.hasOwnProperty(char)) {
            return null;
        }
        curr = curr[char];
    }

    return curr;
};

const findAllPokemon = (node, pokemon, limit) => {
    if (!node) {
        return [];
    }

    if (limit && pokemon.length === limit) {
        return pokemon;
    }

    if (node.hasOwnProperty('match')) {
        pokemon.push(node.match);
    }

    for (const key in node) {
        if (typeof node[key] === 'object' && node[key] !== null) {
            pokemon.concat(findAllPokemon(node[key], pokemon, limit));
        }
    }

    return pokemon;
};

export const searchForPokemon = (searchText, limit) => {
    const node = navigateToNode(pokemonTrie, searchText);
    const pokemon = findAllPokemon(node, [], limit);

    return pokemon;
};

export const fetchRandomPokemon = async () => {
    const urls = generateRandomPokemonURLs(RANDOM_POKEMON_FETCH_COUNT);
    const pokemon = await fetchAllRandomPokemon(urls);

    return pokemon
        .filter((_pokemon) => _pokemon.id && _pokemon.url && _pokemon.name)
        .slice(0, RANDOM_POKEMON_RENDER_COUNT);
};
