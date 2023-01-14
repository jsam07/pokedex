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
    const [isPokemonModalOpen, setPokemonModalState] = useState(false);

    const handleOpenPokemonModal = () => {
        setPokemonModalState(true);
    };

    const handleClosePokemonModal = () => {
        setPokemonModalState(false);
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
                value={{ handleOpenPokemonModal, handleClosePokemonModal }}
            >
                <PokemonModal
                    setState={setPokemonModalState}
                    show={isPokemonModalOpen}
                />
                <main className={styles.main}>
                    <div className={styles.description}>
                        {' '}
                        <p>Get started by searching below</p>
                        <div>
                            <a
                                href="https://www.pokemon.com/us"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                                    alt="Pokemon Logo"
                                    className={`${styles.vercelLogo} mx-4`}
                                    width={160}
                                    height={24}
                                    priority
                                />
                            </a>
                        </div>
                    </div>

                    <div className={styles.center}>
                        <SearchBar />
                    </div>

                    <div className={styles.grid}>
                        <RandomPokemon />
                    </div>
                </main>
            </PokemonModalContext.Provider>
        </>
    );
}
