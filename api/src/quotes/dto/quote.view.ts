import { Quote } from '../quotes.types'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Quote')
export class QuoteView implements Quote {
  @Field()
  lastPrice: string

  @Field()
  symbol: string
}
