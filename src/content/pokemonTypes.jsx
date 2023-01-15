/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Tag from '@/components/Tag';

const objectMap = (obj, fn) => {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
};

export const typeColors = {
    normal: { bg: '#A8A77A', text: 'white' },
    fire: { bg: '#EE8130', text: 'white' },
    water: { bg: '#6390F0', text: 'white' },
    electric: { bg: '#F7D02C', text: 'white' },
    grass: { bg: '#7AC74C', text: 'white' },
    ice: { bg: '#96D9D6', text: 'white' },
    fighting: { bg: '#C22E28', text: 'white' },
    poison: { bg: '#A33EA1', text: 'white' },
    ground: { bg: '#E2BF65', text: 'white' },
    flying: { bg: '#A98FF3', text: 'white' },
    psychic: { bg: '#F95587', text: 'white' },
    bug: { bg: '#A6B91A', text: 'white' },
    rock: { bg: '#B6A136', text: 'white' },
    ghost: { bg: '#735797', text: 'white' },
    dragon: { bg: '#6F35FC', text: 'white' },
    dark: { bg: '#705746', text: 'white' },
    steel: { bg: '#B7B7CE', text: 'white' },
    fairy: { bg: '#D685AD', text: 'white' },
};

const generateTagComponent = (color, name) => {
    const tag = { name };

    return (
        <Tag key={name} className={`bg-${name} text-${color.text}`} tag={tag} />
    );
};

const tags = objectMap(typeColors, (color, name) =>
    generateTagComponent(color, name)
);

export const geTypeColor = (pokemon) => {
    if (!pokemon) {
        return '';
    }

    const type = pokemon.types[0];
    return typeColors[type].bg;
};

export default tags;
