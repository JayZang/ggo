import { createConnection } from 'typeorm'

import { database } from '@/config'

const mysqlConfig = database.mysql

export default async () => {
  const connectionPromise = createConnection({
    type: "mysql",
    host: mysqlConfig.host,
    port: 3306,
    username: mysqlConfig.username,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    entities: [
      `${__dirname}/../entity/*.js`
    ],
    synchronize: true,
    logging: false
  })
  
  await connectionPromise.then(connection => {
    console.log('MySQL Connect Success')
  }).catch(error => {
    console.log('MySQL Connect Fail')
    console.log(error.toString())
  });

  return connectionPromise.then()
}