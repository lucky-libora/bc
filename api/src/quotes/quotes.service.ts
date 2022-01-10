import { Injectable } from '@nestjs/common'
import { BlocktapProxyService } from '../blocktap/blocktap.proxy.service'
import { Quote } from './quotes.types'
import { ConfigService } from '@nestjs/config'
import { QuotesCache } from './cache/quotes.cache'

@Injectable()
export class QuotesService {
  private get baseCurrency(): string {
    return this.configService.get('BASE_CURRENCY')
  }

  constructor(
    private readonly blocktapProxyService: BlocktapProxyService,
    private readonly configService: ConfigService,
    private readonly quotesCache: QuotesCache,
  ) {}

  async getQuotes(symbols: string[]): Promise<Quote[]> {
    const baseSymbols = [...new Set(symbols.map((symbol) => symbol.toUpperCase()))]

    return await this.quotesCache.wrap(baseSymbols, (symbols) =>
      this.blocktapProxyService.getQuotes(symbols, this.baseCurrency),
    )
  }
}
