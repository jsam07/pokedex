import {
    XCircleIcon,
    MicrophoneIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

function SearchModalHeader({
    inputRef,
    listening,
    clearSearch,
    handleSearch,
    SpeechRecognition,
    browserSupportsSpeechRecognition,
}) {
    return (
        <header className="flex-shrink-0 mx-4 my-2 ">
            <div className="relative flex flex-col-reverse items-center justify-between sm:flex-row">
                <div
                    className="flex flex-row w-full sm:ml-4"
                    onClick={() => {
                        inputRef.current.focus();
                    }}
                    aria-hidden="true"
                >
                    <div
                        className="flex items-center pointer-events-none"
                        aria-hidden="true"
                    >
                        <MagnifyingGlassIcon
                            className="w-5 h-5 text-search-dark-blue/30 md:h-6 md:w-6 lg:h-7 lg:w-7"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        ref={inputRef}
                        onChange={handleSearch}
                        className="w-full pl-5 border-none focus:ring-0 placeholder-search-dark-blue/10 text-search-dark-blue md:h-14 lg:h-16"
                    />

                    {inputRef.current && inputRef.current.value.trim() && (
                        <button
                            type="button"
                            aria-label="clear"
                            className="flex items-center"
                            onClick={clearSearch}
                        >
                            <XCircleIcon
                                className="w-5 h-5 transition duration-200 ease-in text-search-dark-blue/30 hover:text-red-500 md:h-6 md:w-6 lg:h-7 lg:w-7"
                                aria-hidden="true"
                            />
                        </button>
                    )}

                    {/* V-Divider */}
                    {inputRef.current &&
                        inputRef.current.value.trim() &&
                        browserSupportsSpeechRecognition && (
                            <div className="mx-2 my-1 border-l border-search-dark-blue/10" />
                        )}

                    {browserSupportsSpeechRecognition && (
                        <span className="relative inline-flex">
                            <button
                                type="button"
                                aria-label="speechRecognition"
                                className="flex items-center"
                                onClick={SpeechRecognition.startListening}
                            >
                                <MicrophoneIcon
                                    className="w-5 h-5 text-blue-600 md:h-6 md:w-6 lg:h-7 lg:w-7"
                                    aria-hidden="true"
                                />
                            </button>
                            {listening && (
                                <span className="absolute top-0 right-0 flex w-2 h-2 my-2 -mr-1">
                                    <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
                                    <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full" />
                                </span>
                            )}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}

export default SearchModalHeader;
