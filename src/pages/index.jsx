/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-constructed-context-values */
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

import SearchBar from '@/components/SearchBar';
import PokemonModal from '@/components/PokemonModal';
import RandomPokemon from '@/components/RandomPokemon';
import { PokemonModalContext } from '@/context/PokemonModalContext';

export default function Home() {
    const [pokemon, setModalPokemon] = useState(null);
    const [isPokemonModalOpen, setPokemonModalState] = useState(false);

    const handleOpenPokemonModal = () => {
        setPokemonModalState(true);
    };

    const handleClosePokemonModal = () => {
        setPokemonModalState(false);
    };

    const handleSetModalPokemon = (_pokemon) => {
        setModalPokemon(_pokemon);
    };

    return (
        <>
            <Head>
                <title>Pokédex</title>
                <meta
                    name="description"
                    content="Use the search to explore Pokémon by type, weakness, ability, and more!"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PokemonModalContext.Provider
                value={{
                    handleSetModalPokemon,
                    handleOpenPokemonModal,
                    handleClosePokemonModal,
                }}
            >
                <PokemonModal
                    pokemon={pokemon}
                    show={isPokemonModalOpen}
                    setState={setPokemonModalState}
                />
                <main className={styles.main}>
                    <a
                        href="https://www.pokemon.com/us"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                            alt="Pokemon Logo"
                            className="m-4 w-44 h-auto"
                            width={160}
                            height={160}
                            priority
                        />
                    </a>
                    <SearchBar />
                    <div className={styles.grid}>
                        <RandomPokemon />
                    </div>
                </main>
            </PokemonModalContext.Provider>
        </>
    );
}
