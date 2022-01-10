/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  quotes: Array<Quote>
}

export type QueryQuotesArgs = {
  symbols: Array<Scalars['String']>
}

export type Quote = {
  lastPrice: Scalars['String']
  symbol: Scalars['String']
}

export type QuotesQueryVariables = Exact<{
  symbols: Array<Scalars['String']> | Scalars['String']
}>

export type QuotesQuery = { quotes: Array<{ lastPrice: string; symbol: string }> }

export const QuotesDocument = gql`
  query quotes($symbols: [String!]!) {
    quotes(symbols: $symbols) {
      lastPrice
      symbol
    }
  }
`

/**
 * __useQuotesQuery__
 *
 * To run a query within a React component, call `useQuotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuotesQuery({
 *   variables: {
 *      symbols: // value for 'symbols'
 *   },
 * });
 */
export function useQuotesQuery(baseOptions: Apollo.QueryHookOptions<QuotesQuery, QuotesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<QuotesQuery, QuotesQueryVariables>(QuotesDocument, options)
}
export function useQuotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuotesQuery, QuotesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<QuotesQuery, QuotesQueryVariables>(QuotesDocument, options)
}
export type QuotesQueryHookResult = ReturnType<typeof useQuotesQuery>
export type QuotesLazyQueryHookResult = ReturnType<typeof useQuotesLazyQuery>
export type QuotesQueryResult = Apollo.QueryResult<QuotesQuery, QuotesQueryVariables>
