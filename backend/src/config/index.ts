import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

export const system = {
    port: process.env.PORT || 300
}

export const database = {
    mysql: {
        host: process.env.MYSQL_HOST || 'mysql',
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: env === 'test' ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE
    },
    mongo: {
        url: env === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6379
    }
}

export const resource = {
    customerLogo: {
        dest: 'uploads/customer/logo/'
    },
    memberAvatar: {
        dest: 'uploads/member/avatar/'
    }
}

export const jwt = {
    secret: process.env.JWT_SECRET || 'GGO_JWT_SECRET_109',
    authValidDuration: 60 * 60 * 3,
    authHeaderName: 'x-access-token'
}