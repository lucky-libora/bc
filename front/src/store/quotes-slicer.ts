import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apolloClient } from '../graphql/apollo-client'
import { QueryQuotesArgs, QuotesDocument, QuotesQuery } from '../graphql/sdk'
import { useDispatch } from 'react-redux'
import { useAppSelector } from './hooks'
import { useEffect } from 'react'

export type Quote = {
  symbol: string
  lastPrice: string
}

export type QuotesState = {
  quotes: Quote[]
}

const initialState: QuotesState = {
  quotes: [],
}

const quotesSlicer = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    deleteQuote: (state, { payload }: PayloadAction<string>) => {
      const symbol = payload.toUpperCase()
      state.quotes = state.quotes.filter((quote) => quote.symbol !== symbol)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewQuote.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }

      state.quotes = [...state.quotes, action.payload]
    })

    builder.addCase(refreshQuotes.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }

      state.quotes = action.payload
    })
  },
})

export const quotesReducer = quotesSlicer.reducer

const addNewQuote = createAsyncThunk('quotes/addNew', async (symbol: string) => {
  const res = await apolloClient.query<QuotesQuery, QueryQuotesArgs>({
    query: QuotesDocument,
    variables: { symbols: [symbol] },
  })

  return res.data.quotes[0]
})

const refreshQuotes = createAsyncThunk('quotes/refresh', async (symbols: string[]) => {
  const res = await apolloClient.query<QuotesQuery, QueryQuotesArgs>({
    query: QuotesDocument,
    variables: { symbols },
  })

  return res.data.quotes
})

export const useQuotes = () => {
  return useAppSelector(({ quotesReducer }) => quotesReducer.quotes)
}

export const useAddQuote = () => {
  const dispatch = useDispatch()
  const quotes = useQuotes()

  return (symbol: string) => {
    const symbolUC = symbol.toUpperCase()
    const isExisting = quotes.some((quote) => quote.symbol === symbolUC)
    if (isExisting) {
      return
    }

    dispatch(addNewQuote(symbolUC))
  }
}

export const useRemoveQuote = () => {
  const dispatch = useDispatch()

  return (symbol: string) => dispatch(quotesSlicer.actions.deleteQuote(symbol))
}

export const useRefreshQuotePeriodically = () => {
  const dispatch = useDispatch()
  const quotes = useQuotes()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!quotes.length) {
        return
      }

      const symbols = quotes.map(({ symbol }) => symbol)
      dispatch(refreshQuotes(symbols))
    }, parseInt(process.env.REACT_APP_QUOTES_REFRESH_INTERVAL_MS || '300000'))

    return () => clearInterval(intervalId)
  })
}
