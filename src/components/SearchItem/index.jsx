/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import { useContext } from 'react';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import tags from '@/content/pokemonTypes';
import { PokemonModalContext } from '@/context/PokemonModalContext';
import { fetchPokemonDetailsFromID } from '@/util/pokemon.util';

function SearchItem({ item: pokemon, handleCloseSearchModal }) {
    const modalContext = useContext(PokemonModalContext);
    const { handleOpenPokemonModal, handleSetModalPokemon } = modalContext;

    const handleClickPokemon = async () => {
        const fullPokemon = await fetchPokemonDetailsFromID(pokemon.id);

        handleSetModalPokemon(fullPokemon);
        handleCloseSearchModal();
        handleOpenPokemonModal();
    };

    return (
        <article onClick={handleClickPokemon} className="flex p-2 space-x-6">
            <Image
                src={pokemon.url}
                alt={pokemon.name}
                className="w-10 h-10 transition duration-500 ease-in-out hover:scale-105"
                width={50}
                height={50}
            />
            <div className="flex flex-auto min-w-0 items-center">
                <div className="flex flex-col">
                    <h2 className="flex font-semibold truncate text-search-dark-blue">
                        {pokemon.name}
                    </h2>

                    <div className="flex items-end w-full">
                        <dt className="sr-only">Types</dt>
                        <div
                            className={`flex flex-row ${
                                pokemon.types.length > 1 ? 'space-x-2' : ''
                            }`}
                        >
                            {pokemon.types.map((type) => tags[type])}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-1 search-btn">
                <div>
                    <span className="sr-only">Select</span>
                    <ArrowRightCircleIcon className="w-5 h-5 text-search-dark-blue md:h-6 md:w-6 lg:h-7 lg:w-7" />
                </div>
            </div>
        </article>
    );
}

export default SearchItem;
