/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import { useContext } from 'react';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import { tags } from '@/content/pokemonTypes';
import { PokemonModalContext } from '@/context/PokemonModalContext';

const inter = Inter({ subsets: ['latin'] });

function PokemonCard({ pokemon }) {
    const modalContext = useContext(PokemonModalContext);
    const { handleOpenPokemonModal, handleSetModalPokemon } = modalContext;

    const handlePokemonClick = () => {
        handleSetModalPokemon(pokemon);
        handleOpenPokemonModal();
    };

    return (
        <button
            type="button"
            className={`${styles.card} flex flex-col mx-1`}
            onClick={handlePokemonClick}
        >
            <h2 className={`${inter.className} capitalize text-left`}>
                {pokemon.name}
                {'  '}
                <span> →</span>
            </h2>
            <Image
                src={pokemon.url}
                alt={pokemon.name}
                className="w-32 h-32 md:w-48 md:h-w-48 mx-auto transition duration-500 ease-in-out hover:scale-105"
                width={100}
                height={100}
                priority
            />
            <div className="flex flex-row mx-auto space-x-2 mt-2">
                {pokemon.types.map((type) => tags[type])}
            </div>
        </button>
    );
}

export default PokemonCard;
