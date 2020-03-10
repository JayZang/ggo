import redis, { RedisClient } from 'redis'

import { database } from '@/config'

const redisConfig = database.redis

export let client: RedisClient

export default async () => {
    client = redis.createClient({
        host: redisConfig.host,
        port: redisConfig.port
    })

    return new Promise((resolve, reject) => {
        client.on('connect', () => {
            console.log('Redis Connect Success')
            resolve(client)
        }).on('error', error => {
            console.log('Redis Connect Fail')
            console.log(error.toString())
            reject(error)
        })
    })
}