/* tslint:disable no-unused-expression no-var-requires newline-per-chained-call no-string-literal */
import * as jwt from 'jsonwebtoken'
import * as request from 'request-promise-native'
import { Connection, createConnection } from 'typeorm'
import settings from '../src/config/settings'
import Server from '../src/server'

describe('root integration test', () => {
  let connection: Connection
  const dbInitializedSeparately: boolean = true
  const baseUrl: string = `http://127.0.0.1:${settings.port}/auth`
  const server: Server = new Server()
  const requestOptions = {
    method: 'GET',
    uri: baseUrl + '/',
  }

  beforeAll(async () => {
    connection = await createConnection({
      type: 'postgres',
      url: settings.dbTestUrl,
      entities: [
        '../src/**/*.entity.ts',
      ],
      logging: false,
      dropSchema: true, // isolate each test case
      synchronize: true,
    })
    await server.up(dbInitializedSeparately)
  })

  afterAll(async () => {
    await server.down()
    await connection.close()
  })

  it('should return a "status":"ok" when called at the root object', () => {
    request({
      ...requestOptions,
    })
      .then((err, res) => {
        expect(err).toBeNull
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toBe('ok')
      })
  })
})
