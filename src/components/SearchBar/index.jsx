import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import SearchModal from '../SearchModal';

function SearchBar() {
    const [isSearchModalOpen, setSearchModalState] = useState(false);

    const showSearchModal = () => {
        setSearchModalState(true);
    };
    const handleKeyPress = (e) => {
        // CTRL + F
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            if (!isSearchModalOpen) {
                e.preventDefault();
                setSearchModalState(true);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="flex flex-col z-50">
            <div className="flex items-center justify-center flex-grow w-full">
                <button
                    type="button"
                    className="flex items-center w-[85vw] h-12 max-w-5xl px-4 mx-8 space-x-3 text-left transition duration-100 ease-in-out bg-white border rounded-lg cursor-text border-search-dark-blue/20 hover:border-0 text-search-dark-blue/30 md:h-14 lg:h-16 hover:drop-shadow-lg"
                    onClick={() => showSearchModal()}
                >
                    <MagnifyingGlassIcon
                        className="w-5 h-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                        aria-hidden="true"
                    />
                    <span className="flex-auto font-ibm-plex md:text-xl lg:text-2xl">
                        Search
                    </span>
                    <kbd className="font-sans font-semibold">
                        <abbr
                            title="Control"
                            className="text-gray-300 no-underline"
                        >
                            Ctrl{' '}
                        </abbr>{' '}
                        F
                    </kbd>
                </button>
            </div>
            <SearchModal
                setState={setSearchModalState}
                show={isSearchModalOpen}
            />
        </div>
    );
}

export default SearchBar;
