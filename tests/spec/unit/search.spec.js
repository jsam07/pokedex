import { searchTree } from '../../fixtures/pokemon.trie';
import { searchForPokemon } from '../../../src/lib/search.lib';

describe('Search Pokemon', () => {
    it('Should return no results if search tree is empty', () => {
        expect(searchForPokemon('search', 2, {})).toEqual([]);
    });

    it('Should return no results if there are no matches', () => {
        expect(searchForPokemon(' ', 2, searchTree)).toEqual([]);
        expect(searchForPokemon('no', 2, searchTree)).toEqual([]);
    });

    it('Should return all matches at or underneath match', () => {
        expect(searchForPokemon('di', 5, searchTree)).toEqual([
            {
                id: 1,
                name: 'ditt',
                url: 'https://example1.com',
                types: ['1'],
            },
            {
                id: 2,
                name: 'ditta',
                url: 'https://example2.com',
                types: ['2'],
            },
            {
                id: 3,
                name: 'ditt0',
                url: 'https://example3.com',
                types: ['1', '2'],
            },
        ]);
        expect(searchForPokemon('ditt', 5, searchTree)).toEqual([
            {
                id: 2,
                name: 'ditta',
                url: 'https://example2.com',
                types: ['2'],
            },
            {
                id: 3,
                name: 'ditt0',
                url: 'https://example3.com',
                types: ['1', '2'],
            },
        ]);
    });

    it('Should limit search results', () => {
        expect(searchForPokemon('di', 0, searchTree)).toEqual([]);
        expect(searchForPokemon('di', 1, searchTree)).toEqual([
            {
                id: 1,
                name: 'ditt',
                url: 'https://example1.com',
                types: ['1'],
            },
        ]);
    });
});
