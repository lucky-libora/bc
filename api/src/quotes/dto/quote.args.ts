import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class QuoteArgs {
  @Field(() => [String])
  symbols: string[]
}
