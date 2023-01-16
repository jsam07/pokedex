/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import { Fragment, useRef, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';

import { tags } from '@/content/pokemonTypes';
import PokemonDetails from '../PokemonDetails';
import { PokemonModalContext } from '@/context/PokemonModalContext';

function PokemonModal({ pokemon, show }) {
    const modalContext = useContext(PokemonModalContext);
    const { handleClosePokemonModal } = modalContext;

    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                open={show}
                auto-reopen="true"
                className="fixed inset-0 z-50"
                onClose={handleClosePokemonModal}
            >
                <div className="flex items-center justify-center text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="false"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className={`border-l-${
                                pokemon ? pokemon.types[0] : '[#fff]'
                            } min-w-[320px] border-l-[12px] relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                                alt="Poké Ball"
                                className="absolute top-0 left-0 mx-auto pt-4 pl-4 flex h-10 w-10 flex-shrink-0 items-center justify-center sm:mx-0 sm:h-12 sm:w-12"
                                width={60}
                                height={60}
                            />
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                {/* Close Button */}
                                <button
                                    type="button"
                                    ref={cancelButtonRef}
                                    className="flex items-center focus:outline-none"
                                    onClick={handleClosePokemonModal}
                                >
                                    <XCircleIcon
                                        className="w-6 h-6 ml-2 sm:ml-0 transition duration-200 ease-in text-search-dark-blue/30 hover:text-red-500 lg:h-7 lg:w-7"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="-mt-20 sm:-mt-24 md:-mt-32">
                                <Image
                                    src={pokemon && pokemon.url}
                                    alt={pokemon ? pokemon.name : 'Pokémon'}
                                    className="w-32 h-32 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto"
                                    width={150}
                                    height={150}
                                />
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left mx-auto">
                                        <div className="flex flex-col">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-2xl md:text-3xl font-bold leading-6 text-gray-900"
                                            >
                                                {pokemon
                                                    ? pokemon.name
                                                    : 'Pokémon'}{' '}
                                                {'  '}
                                                <span className="text-base text-gray-300">
                                                    {pokemon
                                                        ? `#${pokemon.id}`
                                                        : ''}
                                                </span>
                                            </Dialog.Title>
                                            <div className="flex items-center justify-center md:justify-start my-2 space-x-2">
                                                {pokemon &&
                                                    pokemon.types.map(
                                                        (type) => tags[type]
                                                    )}
                                            </div>
                                        </div>

                                        <div className="my-1">
                                            <p className="text-sm text-gray-500 text-ellipsis">
                                                {pokemon
                                                    ? pokemon.description
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-3 justify-center">
                                <div className="inline-flex items-center rounded-md bg-slate-100 text-slate-600 px-2.5 py-0.5 text-sm font-base">
                                    {pokemon &&
                                        `${pokemon.height} m | ${pokemon.weight} kg`}
                                </div>
                            </div>
                            <PokemonDetails pokemon={pokemon} />
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm transition duration-500 ease-in-out"
                                    onClick={handleClosePokemonModal}
                                >
                                    Close
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default PokemonModal;
