import React from 'react'

import Country from '../../../shapes/country';
import { CountryCardContainer, Emoji, Text } from './country-card.style';

const CountryCard = ({ country }) => {
    console.log(country);
    return (
        <CountryCardContainer>
            <Text>{country.name}</Text>
            <Text>Capital: {country.capital}</Text>
            <Text>Code: {country.code}</Text>
            <Emoji>{country.emoji}</Emoji>
        </CountryCardContainer>
    );
};

CountryCard.propTypes = {
    country: Country.isRequired,
}

export default CountryCard;
