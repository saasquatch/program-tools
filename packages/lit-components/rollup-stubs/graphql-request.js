// Re-export graphql-request with GraphQLClient as a named export
export { GraphQLClient as default } from 'graphql-request';

// Also export as named export for direct imports
import GR from 'graphql-request';
export const GraphQLClient = GR.GraphQLClient || GR;