import { createConnection, getConnectionOptions } from 'typeorm'

import { database } from '@/config'

const mysqlConfig = database.mysql

export default async () => {
    const connectionOptions = await getConnectionOptions();
    if (connectionOptions.type === 'mysql')
        // supported to insert emoji character
        Object.assign(connectionOptions, {charset: 'utf8mb4_unicode_ci'})

    const connectionPromise = createConnection(connectionOptions)
  
    await connectionPromise.then(connection => {
        console.log('MySQL Connect Success')
    }).catch(error => {
        console.log('MySQL Connect Fail')
        console.log(error.toString())
    });

    return connectionPromise.then()
}