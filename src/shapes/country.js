import { shape, string, arrayOf } from 'prop-types';

const Country = shape({
    name: string,
    capital: string,
    currency: string,
    emoji: string,
    languages: arrayOf(shape({
        code: string,
        name: string
    })),
});

export default Country;