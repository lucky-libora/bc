import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { gql, request } from 'graphql-request'
import { BlocktapMarketsResponse } from './blocktap.types'
import { Quote } from '../quotes/quotes.types'

@Injectable()
export class BlocktapProxyService {
  private get endpoint(): string {
    return this.configService.get('BLOCKTAP_GRAPHQL_ENDPOINT')
  }

  constructor(private readonly configService: ConfigService) {}

  async getQuotes(baseSymbols: string[], quoteSymbol: string): Promise<Quote[]> {
    const resp = await this.getMarkets(baseSymbols, quoteSymbol)

    return this.mapMarketsResponseToQuotes(resp, baseSymbols)
  }

  private async getMarkets(baseSymbols: string[], quoteSymbol: string): Promise<BlocktapMarketsResponse> {
    const query = gql`
      query price($baseSymbols: [String!]!, $quoteSymbol: String!) {
        markets(filter: { baseSymbol: { _in: $baseSymbols }, quoteSymbol: { _eq: $quoteSymbol } }) {
          marketSymbol
          ticker {
            lastPrice
          }
        }
      }
    `

    return await request<BlocktapMarketsResponse>(this.endpoint, query, { baseSymbols, quoteSymbol })
  }

  private mapMarketsResponseToQuotes(resp: BlocktapMarketsResponse, baseSymbols: string[]): Quote[] {
    const { markets } = resp

    return baseSymbols
      .map((baseSymbol) => {
        const match = markets.find(({ marketSymbol }) => {
          return this.parseSymbol(marketSymbol).toUpperCase() === baseSymbol.toUpperCase()
        })

        if (!match) {
          return null
        }

        return {
          symbol: baseSymbol,
          lastPrice: match.ticker.lastPrice,
        }
      })
      .filter((quote) => quote)
  }

  private parseSymbol(marketSymbol: string): string {
    const [, temp] = marketSymbol.split(':')

    return temp.split('/')[0]
  }
}
