import Image from 'next/image';

import SearchItem from '../SearchItem';

function SearchModalItems({ isSearchActive, results, handleCloseSearchModal }) {
    return (
        <div className="search-container flex-grow overflow-auto py-2 max-h-[500px]">
            {isSearchActive ? (
                <ul className="">
                    {results.length === 0 ? (
                        <div className="flex items-center justify-center my-8 text-search-dark-blue/30">
                            No Results Found
                        </div>
                    ) : (
                        results.map((item) => (
                            <li
                                key={item.id}
                                className="mx-2 my-1.5 rounded-md  snap-always snap-center transition duration-200 ease-in-out hover:cursor-pointer hover:bg-search-gray"
                            >
                                <SearchItem
                                    item={item}
                                    handleCloseSearchModal={
                                        handleCloseSearchModal
                                    }
                                />
                            </li>
                        ))
                    )}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center my-8 text-search-dark-blue/30">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                        alt="Pokemon Logo"
                        className="m-4 w-28 sm:w-32 md:w-36 h-auto"
                        width={160}
                        height={160}
                        priority
                    />
                    <div className="mx-2">Search for Pokémon by name.</div>
                </div>
            )}
        </div>
    );
}

export default SearchModalItems;
