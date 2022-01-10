import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import * as path from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ConfigService } from '@nestjs/config'
import { configModule } from './config.module'

export const graphqlModule = GraphQLModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const plugins: GqlModuleOptions['plugins'] = []
    if (configService.get('GRAPHQL_PLAYGROUND_ENABLED')) {
      plugins.push(ApolloServerPluginLandingPageLocalDefault())
    }

    return {
      autoSchemaFile: path.join(process.cwd(), 'src/schema.graphql'),
      playground: false,
      introspection: !!configService.get('GRAPHQL_INTROSPECTION_ENABLED'),
      plugins,
    }
  },
  imports: [configModule],
})

GraphQLModule.forRoot({
  autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
})
