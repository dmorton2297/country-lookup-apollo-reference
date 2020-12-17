import React from 'react';
import { arrayOf } from 'prop-types';

import Country from '../../../shapes/country';
import CountryCard from '../country-card';

/**
 * Displays a list of countries
 * @param {object} params - Object containing props for this component
 * @param {object[]} params.countryData - List of countries
 */
const CountryList = ({ countryData }) => {
    return countryData.map((country, i) => <CountryCard country={country} key={i} />)
};

CountryList.propsTypes = {
    countryData: arrayOf(Country),
}

CountryList.defaultProps = {
    countryData: [],
};

export default CountryList
