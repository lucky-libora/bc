export type BlocktapMarketsResponse = {
  markets: [
    {
      marketSymbol: string
      ticker: {
        lastPrice: string
      }
    },
  ]
}
