import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function PokemonModal({ show, setState }) {
    const closePokemonModal = () => {
        setState(false);
    };

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                auto-reopen="true"
                // initialFocus={inputRef}
                className="fixed inset-0 z-50"
                onClose={closePokemonModal}
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
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-search-dark-blue bg-opacity-30" />
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
                        <div className="flex flex-col font-ibm-plex w-screen max-w-5xl max-h-[95vh] min-w-[320px] mx-8 my-4 text-left align-middle transition-all transform bg-white rounded-lg shadow-xl flex-nowrap">
                            {/* Search Bar */}
                            Header
                            {/* H-Divider */}
                            <div className="border-t border-search-dark-blue/10" />
                            {/* Search Items Container */}
                            Container
                            {/* H-Divider */}
                            <div className="border-t border-search-dark-blue/10" />
                            Footer
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default PokemonModal;
