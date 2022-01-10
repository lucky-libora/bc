import { Args, Query, Resolver } from '@nestjs/graphql'
import { Quote } from './quotes.types'
import { QuotesService } from './quotes.service'
import { QuoteView } from './dto/quote.view'
import { QuoteArgs } from './dto/quote.args'

@Resolver()
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @Query(() => [QuoteView])
  async quotes(@Args() args: QuoteArgs): Promise<Quote[]> {
    return await this.quotesService.getQuotes(args.symbols)
  }
}
