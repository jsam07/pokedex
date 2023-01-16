/* eslint-disable import/prefer-default-export */
export const searchTree = {
    d: {
        i: {
            t: {
                match: {
                    id: 1,
                    name: 'ditt',
                    url: 'https://example1.com',
                    types: ['1'],
                },
                t: {
                    a: {
                        match: {
                            id: 2,
                            name: 'ditta',
                            url: 'https://example2.com',
                            types: ['2'],
                        },
                    },
                    o: {
                        match: {
                            id: 3,
                            name: 'ditt0',
                            url: 'https://example3.com',
                            types: ['1', '2'],
                        },
                    },
                },
            },
        },
    },
};
