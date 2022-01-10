import { QuotesCache } from './quotes.cache'
import { Test } from '@nestjs/testing'
import { redisToken } from '../../redis/redis.provider'
import { configModule } from '../../config.module'

describe('QuotesCache', () => {
  describe('#wrap', () => {
    let quotesCache: QuotesCache

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          {
            provide: redisToken,
            useValue: {},
          },
          QuotesCache,
        ],
        imports: [configModule],
      }).compile()

      quotesCache = await moduleRef.get(QuotesCache)
    })

    it('should call fallback fn for only not cached values and store them', async () => {
      quotesCache.get = jest.fn().mockImplementation((key: string) => {
        if (['BTC', 'LTC'].includes(key)) {
          return '1.000'
        }

        return null
      })

      const fallbackFn = jest.fn().mockResolvedValue([
        {
          symbol: 'XRP',
          lastPrice: '2.000',
        },
        {
          symbol: 'XMR',
          lastPrice: '3.000',
        },
      ])

      quotesCache.store = jest.fn()

      const res = await quotesCache.wrap(['BTC', 'LTC', 'XRP', 'XMR'], fallbackFn)

      expect(res).toStrictEqual([
        {
          symbol: 'BTC',
          lastPrice: '1.000',
        },
        {
          symbol: 'LTC',
          lastPrice: '1.000',
        },
        {
          symbol: 'XRP',
          lastPrice: '2.000',
        },
        {
          symbol: 'XMR',
          lastPrice: '3.000',
        },
      ])
      expect(fallbackFn).toBeCalledWith(['XRP', 'XMR'])

      await new Promise((s) => setImmediate(s))
      expect(quotesCache.store).toBeCalledTimes(2)
    })
  })
})
