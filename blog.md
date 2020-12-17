## Setting up ApolloClient in a React Web Application

# What is Apollo? 
Apollo is the industry standard GraphQl implementation. They offer both ApolloServer and ApolloClient. ApolloServer is an open source production ready server that allows you to combine multiple data sources into a singular GraphQl API. ApolloClient, on the other hand, handles application state on client applcication though data queries / mutations against a GraphQl api.

# Apollo Client
When building a react app to be hooked up with a GraphQL API, the defacto option is ApolloClient. All you need to get going with learning apollo client is...

* Get Access to a GraphQl API
* Start coding!

Luckily for developers, there are a number of Open Source GraphQL API's that you can experiment with, and ultimately build a UI around. Here is a good place to look : https://github.com/APIs-guru/graphql-apis

I ended up picking https://countries.trevorblades.com/, a free GraphQL API that allows you to query country data.

# A Simple Goal
In my code example I want to use the `countries` query from https://countries.trevorblades.com/ and allow a user to query different filter options.

Below is the Schema important to the code.
```graphql
input CountryFilterInput {
  code: StringQueryOperatorInput
  currency: StringQueryOperatorInput
  continent: StringQueryOperatorInput
}

input StringQueryOperatorInput {
  eq: String
  ne: String
  in: [String]
  nin: [String]
  regex: String
  glob: String
}


type Country {
  code: ID!
  name: String!
  native: String!
  phone: String!
  continent: Continent!
  capital: String
  currency: String
  languages: [Language!]!
  emoji: String!
  emojiU: String!
  states: [State!]!
}

type Query {
  countries(filter: CountryFilterInput): [Country!]!
}
```

# Project Reference
Clone this project using 
```
git clone https://github.com/dmorton2297/country-lookup-apollo-reference
```
# 

# Connective React to a GraphQl Api
# Step 0 - Scaffold project, install dependencies
* I created my application with `create-react-app` and changed the folder structure as needed. 
* Install dependencies for Apollo and GraphQl
```bash
npm install @apollo/client graphql --save
```
* Defining a component structure and building. Note: omitting details of building UI as this post specifically focuses on ApolloClient.

```
               |CountrySearchForm       
App -> Home -> |CountryList   ---> |CountryCard
                ‾                  |CountryCard
                                   |  ..n
                                    ‾
```                     
* Roles of each component
* **App**: Sets up ApolloClient and ApolloProvider HOC
* **Home**: Query for country information based of values * *CountrySearchForm, and display them in CountryList
* **CountrySearchForm** Input values for Countries query

* **CountryList**: Display results with **CountryCards**

# Step 1 - Setup Apollo Client
* Pick a location to store your apollo client. In my repository, this is in src/apollo/client/client.js
* Specify two things, `uri` and `cache`. `uri` should be set to the public URL of the app's GQL Api. In this case that is https://countries.trevorblades.com. Cache can be set to an InMemoryCache(), which will store results of queries on the browser and handles application state. In my case, my client file looks like this. 
```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client';

const GqlClient = new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache()
});

export default GqlClient;
```

# Step 2 - Setup Apollo Provider
* Wrap your application in an ApolloProvider HOC, passing the client you set in step 1 in it's client prop.
* This is done in App.js in my project. 
```js

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import GqlClient from '../../../apollo/client';
import AppBar from '../../core/app-bar';
import Home from '../home';

const App = () => {
  return (
    <ApolloProvider client={GqlClient}>
        ...
        <Home />
        ...
    </ApolloProvider>

  );
};

export default App;

```

# Step 3 - Defining your Query
* Decide where to store your queries. In my project, they are stored in src/apollo/queries.
* Here we must define what query we want to use in our Client app, so we can later use it to make a request to our GQL API. 
Here is the definition of our countries query. 
```javascript
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
```

# Step 4 - Calling your Query with `useQuery`
* Determine what component should be maintaining this state. In my project, src/containers/home/home.js handles querying the GQL Api. 
* Define some state to hold your query parameters, by default, set it to null. 
```javascript
const [queryParams, setQueryParms] = null;
```
* Pull in useQuery, conditionally pass in queryParams based on value
```javascript
const { loading, error, data } = useQuery(COUNTRIES_QUERY, {
    variables: queryParams ? {
        filter: queryParams
    } : {}, // If query params is null set to empty.
});
```
* When this component renders, it will reach out to make a request agains the countries query. Initially loading will be true, until data or an error is returned. This hook will be called each time queryParams has changed, however it won't neccissarily reach out to the network each time. If you query the same thing twice, its result is cached in the browser and used for queries at a later time. 
* Overall structure of home page (... spcifies omissions)
```javascript
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
    ...
    // Apollo hook
    const { loading, error, data } = useQuery(COUNTRIES_QUERY, {
        variables: queryParams ? {
            filter: queryParams
        } : {},
    });
    ...

    // Render
    return (
        <MainContainer>
            ...
            <CountryList countryData={data?.countries} />
            ...
        </MainContainer>
    );
};

export default Home;

```

# Step 5 - Hooking up Form to Inputs
* I am using formik to map form inputs into a valid filter option. As defined by the graphql payload, the filter object must look like 
```graphQL
input CountryFilterInput {
  code: StringQueryOperatorInput
  currency: StringQueryOperatorInput
  continent: StringQueryOperatorInput
}

input StringQueryOperatorInput {
  eq: String
  ne: String
  in: [String]
  nin: [String]
  regex: String
  glob: String
}
```
The CountrySerchForm component wil return an object that looks like the following based on input.
```javsscript
{
    code: {
        eq: "string"
    },
    currency: {
        regex: "string
    },
    continent: {
        eq: "string"
    }
}
```
Each time the form is submitted, I am setting queryParams with
```
setQueryParams(params);
```
which in turn updates the UseQuery hook, and gets a query result based off those params. 
* Complete home.js component
```javascript
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

```




