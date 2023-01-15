/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const TOTAL_POKEMON = 1008;
const RANDOM_POKEMON_FETCH_COUNT = 15;
const RANDOM_POKEMON_RENDER_COUNT = 4;
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species';

// TODO: wrap async blocks in try/catch
// TODO: document function

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

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

export const fetchPokemonDescription = async (id, name) => {
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

const fetchAllPokemon = async (urls) => {
    return Promise.all(
        urls.map(async (url) => {
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
        })
    );
};

export const fetchRandomPokemon = async () => {
    const urls = generateRandomPokemonURLs(RANDOM_POKEMON_FETCH_COUNT);
    const pokemon = await fetchAllPokemon(urls);

    return pokemon
        .filter((_pokemon) => _pokemon.id && _pokemon.url && _pokemon.name)
        .slice(0, RANDOM_POKEMON_RENDER_COUNT);
};
