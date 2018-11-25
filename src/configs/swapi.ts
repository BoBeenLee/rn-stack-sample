import { execute, makePromise } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

export type IFetch = (query: string | object, variables?: object) => Promise<any>;

const URI = "https://swapi.apis.guru/";

const httpLink = createHttpLink({
    uri: URI
});

const swapiFetch: IFetch = (query, variables) => {
    const operationQuery = gql(query);

    const operation = {
        query: operationQuery,
        variables
    };

    return makePromise(execute(httpLink, operation)).then(response => {
        return response;
    });
};

export default swapiFetch;
