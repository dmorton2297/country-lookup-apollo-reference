import { useQuery } from '@apollo/client';
import React, { useState } from 'react'

import CountryList from '../../core/country-list';
import COUNTRIES_QUERY from '../../../apollo/queries';
import CountrySearchForm from '../../core/country-search-form';
import { MainContainer } from './home.styles';

/**
 * Home component of the application
 * @return {element} - The home component
 */
const Home = () => {
    // State Hooks
    const [queryParams, setQueryParams] = useState(null);
    const [currentValues, setCurrentValues] = useState(null);

    // Apollo hook
    const { loading, error, data } = useQuery(COUNTRIES_QUERY, {
        variables: queryParams ? {
            filter: queryParams
        } : {},
    });

    /**
     * Handles submitting the country search form
     * @param {object} values - Values submitted from form
     * @param {*} queryParams - Query parameters to feed query
     * @return {void}
     */
    const submitCountrySearchForm = (values, queryParams) => {
        setQueryParams(queryParams);
        setCurrentValues(values);
    }

    // If loading
    if (loading) {
        return <p>Loading</p>;
    }

    // If error
    if (error) {
        return <p>Unexpected error</p>
    }

    // Render
    return (
        <MainContainer>
            <CountrySearchForm
                currentValues={currentValues}
                onSubmit={submitCountrySearchForm}
            />
            <CountryList countryData={data?.countries} />
        </MainContainer>
    );
};

export default Home;
