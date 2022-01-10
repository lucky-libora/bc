import { FactoryProvider, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import IORedis, { Redis } from 'ioredis'

export const redisToken = Symbol('Redis')

export const redisProvider: FactoryProvider<Redis> = {
  provide: redisToken,
  useFactory: (configService: ConfigService) => {
    const redisUri = configService.get('REDIS_URI')

    return new IORedis(redisUri)
  },
  inject: [ConfigService],
}

export const InjectRedis = () => Inject(redisToken)
