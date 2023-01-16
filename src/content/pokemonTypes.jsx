import Tag from '@/components/Tag';
import { objectMap } from '@/lib/common.lib';

/* eslint-disable import/prefer-default-export */
export const pokemonTypes = {
    normal: { bg: '#A8A77A', text: 'white', icon: '🔘' },
    fire: { bg: '#EE8130', text: 'white', icon: '🔥' },
    water: { bg: '#6390F0', text: 'white', icon: '💧' },
    electric: { bg: '#F7D02C', text: 'white', icon: '⚡' },
    grass: { bg: '#7AC74C', text: 'white', icon: '🌱' },
    ice: { bg: '#96D9D6', text: 'white', icon: '❄️' },
    fighting: { bg: '#C22E28', text: 'white', icon: '🥊' },
    poison: { bg: '#A33EA1', text: 'white', icon: '☠️' },
    ground: { bg: '#E2BF65', text: 'white', icon: '🍂' },
    flying: { bg: '#A98FF3', text: 'white', icon: '🕊️' },
    psychic: { bg: '#F95587', text: 'white', icon: '🧠' },
    bug: { bg: '#A6B91A', text: 'white', icon: '🐛' },
    rock: { bg: '#B6A136', text: 'white', icon: '🪨' },
    ghost: { bg: '#735797', text: 'white', icon: '👻' },
    dragon: { bg: '#6F35FC', text: 'white', icon: '🐉' },
    dark: { bg: '#705746', text: 'white', icon: '🟤' },
    steel: { bg: '#B7B7CE', text: 'white', icon: '🔩' },
    fairy: { bg: '#D685AD', text: 'white', icon: '🧚‍♀️' },
};

const generateTagComponent = (type, name) => {
    const tag = { name, icon: type.icon };

    return (
        <Tag key={name} className={`bg-${name}/20 text-${name}`} tag={tag} />
    );
};

export const tags = objectMap(pokemonTypes, (type, name) =>
    generateTagComponent(type, name)
);

export const geTypeColor = (pokemon) => {
    if (!pokemon) {
        return '';
    }

    const type = pokemon.types[0];
    return pokemonTypes[type].bg;
};
