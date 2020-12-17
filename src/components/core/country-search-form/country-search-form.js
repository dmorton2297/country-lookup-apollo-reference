import React from 'react';
import { Form, Formik } from 'formik';
import { func, object } from 'prop-types';
import { FormContainer, TextInput } from './country-search-form.style';

/**
 * The country search form
 * @param {object} params - Object containing props
 * @param {function} params.onSubmit - Function handler to submit the form
 * @param {object} params.currentValues - State holding the current values for this form
 */
const CountrySearchForm = ({ onSubmit, currentValues }) => {

    /**
     * Handles submitting the form
     */
    const handleSubmit = (values) => {
        const payload = {
            code: values.code ? {
                eq: values.code,
            } : undefined,
            currency: values.currency ? {
                regex: values.currency || '',
            } : undefined,
            continent: values.continent ? {
                eq: values.continent || '',
            } : undefined,
        }
        onSubmit(values, payload);
    }

    return (
        <Formik
            initialValues={currentValues ? currentValues : {
                code: '',
                currency: '',
                continent: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                handleSubmit(values);
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <FormContainer>
                        <TextInput placeholder="COUNTRY CODE" type="text" name="code" />
                        <TextInput placeholder="CURRENCY CODE" type="text" name="currency" />
                        <TextInput placeholder="CONTINENT CODE" type="text" name="continent" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </FormContainer>

                </Form>
            )}
        </Formik>
    )
}

CountrySearchForm.propTypes = {
    onSubmit: func,
    currentValues: object,
};

CountrySearchForm.defaultProps = {
    onSubmit: () => { },
    currentValues: {}
};

export default CountrySearchForm;
