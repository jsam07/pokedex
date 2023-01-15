/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useState } from 'react';
import { Tab, Transition } from '@headlessui/react';
import PokemonBaseStats from '../PokemonBaseStats';
import PokemonAbilities from '../PokemonAbilities';

const tabs = [{ name: 'Base Stats' }, { name: 'Abilities' }];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function getTabColor(pokemon) {
    if (!pokemon) {
        return 'border-indigo-500 text-indigo-600';
    }
    const type = pokemon.types[0];
    return `border-${type} text-${type}`;
}

function PokemonDetails({ pokemon }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <Tab.Group
            as="div"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
        >
            <Tab.List className="border-b border-gray-200 -mb-0.5 flex space-x-8 items-center justify-center">
                {tabs.map((tab, index) => (
                    <Tab
                        key={tab.name}
                        className={classNames(
                            index === selectedIndex
                                ? getTabColor(pokemon)
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                            'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
                        )}
                    >
                        {tab.name}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <Transition
                        appear
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <PokemonBaseStats stats={pokemon.stats} />
                    </Transition>
                </Tab.Panel>
                <Tab.Panel>
                    <Transition
                        appear
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <PokemonAbilities abilities={pokemon.abilities} />
                    </Transition>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}

export default PokemonDetails;
