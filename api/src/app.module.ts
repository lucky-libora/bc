import { Module } from '@nestjs/common'
import { BlocktapProxyService } from './blocktap/blocktap.proxy.service'
import { QuotesService } from './quotes/quotes.service'
import { QuotesResolver } from './quotes/quotes.resolver'
import { redisProvider } from './redis/redis.provider'
import { QuotesCache } from './quotes/cache/quotes.cache'
import { graphqlModule } from './graphql.module'
import { configModule } from './config.module'

@Module({
  imports: [configModule, graphqlModule],
  providers: [BlocktapProxyService, QuotesService, QuotesResolver, redisProvider, QuotesCache],
})
export class AppModule {}
