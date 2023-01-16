import { useEffect, useState } from 'react';

import { fetchRandomPokemon } from '@/lib/pokemon.lib';
import PokemonCard from '../PokemonCard';

function RandomPokemon() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            const randomPokemon = await fetchRandomPokemon();
            setPokemon(randomPokemon);
        };

        fetchPokemon();
    }, []);

    return (
        <>
            {pokemon.map((_pokemon) => (
                <PokemonCard key={_pokemon.id} pokemon={_pokemon} />
            ))}
        </>
    );
}

export default RandomPokemon;
