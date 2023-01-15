/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/**.{js,ts,jsx,tsx}',
        './src/styles/**/**.{js,ts,jsx,tsx}',
        './src/content/**/**.{js,ts,jsx,tsx}',
        './src/components/**/**.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'search-red': '#FF2020',
                'search-gray': '#F3F3F3',
                'search-white': '#FFFFFF',
                'search-dark-blue': '#111827',
                'search-bright-blue': '#205FFF',
                normal: '#A8A77A',
                fire: '#EE8130',
                water: '#6390F0',
                electric: '#F7D02C',
                grass: '#7AC74C',
                ice: '#96D9D6',
                fighting: '#C22E28',
                poison: '#A33EA1',
                ground: '#E2BF65',
                flying: '#A98FF3',
                psychic: '#F95587',
                bug: '#A6B91A',
                rock: '#B6A136',
                ghost: '#735797',
                dragon: '#6F35FC',
                dark: '#705746',
                steel: '#B7B7CE',
                fairy: '#D685AD',
                hp: '#df2140',
                attack: '#ff994d',
                defense: '#ffdc43',
                'special-attack': '#85ddff',
                'special-defense': '#a8ef89',
                speed: '#fc93a8',
            },
            boxShadow: {
                search: '0 16px 16px 2px rgba(29,17,51,.04),0 6px 24px 4px rgba(9,32,77,.12),0 8px 12px -5px rgba(29,17,51,.12)',
            },
        },
    },
    safelist: [
        'text-white',
        {
            pattern:
                /(bg|border|text)(-(l|r|t|b))?-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
        },
        {
            pattern:
                /(bg|text)-(hp|attack|defense|special-attack|special-defense|speed)/,
        },
    ],
    plugins: [require('@tailwindcss/forms')],
};
