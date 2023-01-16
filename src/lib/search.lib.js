/* eslint-disable no-prototype-builtins */
import { pokemonTrie } from '@/data/pokemon.trie';

/**
 * Navigates the node that matches `searchText` if it exists.
 * @param {object} trie A k-ary search tree
 * @param {string} searchText The text to search for.
 * @returns Returns the node in the trie that corresponds to the `searchText`, null if it does not exist.
 */
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

/**
 * Finds all pokemon at or underneath the given node in the search tree.
 * @param {object | null} node A given node in the search tree.
 * @param {object[]} pokemon Array of all pokemon found so far.
 * @param {number} limit The maximum number of pokemon to search for.
 * @returns An array of all pokemon found so far.
 */
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

/**
 * Generate Trie for auto-complete searching.
 * @param {object} pokemon Details of pokemon.
 * @returns A k-ary search tree.
 */
// eslint-disable-next-line no-unused-vars
export const generateTrie = (pokemon) => {
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

/**
 * Searches trie for all pokemon whose name start with `searchText`.
 * @param {string} searchText The text for query for pokemon.
 * @param {number} limit The maximum number of pokemon to search for.
 * @returns An array of all pokemon found in the search tree.
 */
export const searchForPokemon = (searchText, limit) => {
    const node = navigateToNode(pokemonTrie, searchText);
    const pokemon = findAllPokemon(node, [], limit);

    return pokemon;
};
