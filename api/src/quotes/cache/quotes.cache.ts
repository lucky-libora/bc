import { Injectable } from '@nestjs/common'
import { InjectRedis } from '../../redis/redis.provider'
import { Redis } from 'ioredis'
import { Quote } from '../quotes.types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class QuotesCache {
  private get ttl(): number {
    return this.configService.get('CACHE_TTL_MS')
  }

  constructor(@InjectRedis() private readonly redis: Redis, private readonly configService: ConfigService) {}

  async get(symbol: string): Promise<string> {
    const redisKey = this.getRedisKey(symbol)

    return await this.redis.get(redisKey)
  }

  async getMulti(symbols: string[]): Promise<Quote[]> {
    const cached = await Promise.all(
      symbols.map(async (symbol) => {
        const lastPrice = await this.get(symbol)
        if (!lastPrice) {
          return null
        }

        return {
          symbol,
          lastPrice,
        }
      }),
    )

    return cached.filter((quote) => quote)
  }

  async store({ symbol, lastPrice }: Quote): Promise<void> {
    const redisKey = this.getRedisKey(symbol)
    await this.redis.psetex(redisKey, this.ttl, lastPrice)
  }

  async storeMulti(quotes: Quote[]): Promise<void> {
    await Promise.all(quotes.map((quote) => this.store(quote)))
  }

  async wrap(symbols: string[], fallback: (symbols: string[]) => Promise<Quote[]>): Promise<Quote[]> {
    const cached = await this.getMulti(symbols)
    const cachedMap = cached.reduce((prev, { symbol, lastPrice }) => {
      return { ...prev, [symbol]: lastPrice }
    }, {})

    const notCachedSymbols = symbols.filter((symbol) => !cachedMap[symbol])

    if (!notCachedSymbols.length) {
      return cached
    }

    const fallbackResults = await fallback(notCachedSymbols)

    setImmediate(() => this.storeMulti(fallbackResults))

    return [...cached, ...fallbackResults]
  }

  private getRedisKey(symbol: string): string {
    return `quote:${symbol.toLowerCase()}`
  }
}
