/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import { useContext } from 'react';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import tags from '@/content/pokemonTypes';
import { PokemonModalContext } from '@/context/PokemonModalContext';

const inter = Inter({ subsets: ['latin'] });

function PokemonCard({ pokemon }) {
    const modalContext = useContext(PokemonModalContext);
    const { handleOpenPokemonModal } = modalContext;

    return (
        <button
            type="button"
            className={`${styles.card} flex flex-col mx-1`}
            onClick={() => handleOpenPokemonModal()}
        >
            <h2 className={`${inter.className} capitalize text-left`}>
                {pokemon.name}
                <span>-&gt;</span>
            </h2>
            <Image
                src={pokemon.url}
                alt={pokemon.name}
                className="w-32 h-32 md:w-48 md:h-w-48 mx-auto"
                width={100}
                height={100}
                priority
            />
            <div className="flex flex-row mx-auto">
                {pokemon.types.map((type) => {
                    const Tag = tags[type];
                    return <Tag key={type} />;
                })}
            </div>
        </button>
    );
}

export default PokemonCard;
