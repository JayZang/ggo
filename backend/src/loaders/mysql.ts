import { createConnection, getConnectionOptions } from 'typeorm'

import { database } from '@/config'

const mysqlConfig = database.mysql

export default async () => {
    const connectionPromise = createConnection()
  
    await connectionPromise.then(connection => {
        console.log('MySQL Connect Success')
    }).catch(error => {
        console.log('MySQL Connect Fail')
        console.log(error.toString())
    });

    return connectionPromise.then()
}