import { gql } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
    query countries($filter: CountryFilterInput) {
        countries(filter: $filter) {
        code
        name
        native
        capital
        emoji
        currency
        languages {
            code
            name
        }
    }
}
`;

export default COUNTRIES_QUERY;