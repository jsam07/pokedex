/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef, useEffect } from 'react';

import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';

import SearchModalHeader from '../SearchModalHeader';
import SearchModalItems from '../SearchModalContainer';
import { searchForPokemon } from '@/util/pokemon.util';
import { POKEMON_QUERY_LIMIT } from '@/constants';

function SearchModal({ show, setState }) {
    const inputRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const { listening, transcript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    const handleSearch = () => {
        const searchQuery = inputRef.current.value.trim();

        if (searchQuery) {
            const queryResults = searchForPokemon(
                searchQuery.toLowerCase(),
                POKEMON_QUERY_LIMIT
            );

            setSearchResults(queryResults);
            setIsSearchActive(true);
        } else {
            setSearchResults([]);
            setIsSearchActive(false);
        }
    };

    const handleClearSearch = () => {
        inputRef.current.value = '';
        handleSearch();
    };

    const handleCloseSearchModal = () => {
        setState(false);
        handleClearSearch();
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = transcript;
            handleSearch();
        }
    }, [transcript, listening]);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                auto-reopen="true"
                initialFocus={inputRef}
                className="fixed inset-0 z-50"
                onClose={handleCloseSearchModal}
            >
                <div className="flex items-start md:items-center justify-center text-center">
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
                        <div className="flex flex-col font-ibm-plex w-screen max-w-2xl max-h-[500px] min-w-[320px] mx-8 my-4 text-left align-middle transition-all transform bg-white rounded-lg shadow-xl flex-nowrap">
                            {/* Search Bar */}
                            <SearchModalHeader
                                inputRef={inputRef}
                                listening={listening}
                                clearSearch={handleClearSearch}
                                handleSearch={handleSearch}
                                SpeechRecognition={SpeechRecognition}
                                browserSupportsSpeechRecognition={
                                    browserSupportsSpeechRecognition
                                }
                            />

                            {/* H-Divider */}
                            <div className="border-t border-search-dark-blue/10" />

                            {/* Search Items Container */}
                            <SearchModalItems
                                results={searchResults}
                                isSearchActive={isSearchActive}
                                handleCloseSearchModal={handleCloseSearchModal}
                            />
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default SearchModal;
