import { BlocktapProxyService } from './blocktap.proxy.service'
import { Test } from '@nestjs/testing'
import { configModule } from '../config.module'
import { marketsResponse } from './fixtures/markets.response'

describe('BlocktapProxyService', () => {
  describe('#getQuotes', () => {
    let blockTapProxyService: BlocktapProxyService

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [BlocktapProxyService],
        imports: [configModule],
      }).compile()

      blockTapProxyService = await moduleRef.get(BlocktapProxyService)
    })

    it('should correctly map payload from blocktap', async () => {
      const getMarketsMock = jest.fn()
      Reflect.set(blockTapProxyService, 'getMarkets', getMarketsMock)
      getMarketsMock.mockResolvedValue(marketsResponse)

      const quotes = await blockTapProxyService.getQuotes(['btc', 'ltc'], 'eur')

      expect(quotes).toStrictEqual([
        {
          symbol: 'btc',
          lastPrice: '42515.34000000',
        },
        {
          symbol: 'ltc',
          lastPrice: '180.30000000',
        },
      ])
    })
  })
})
