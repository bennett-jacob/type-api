/* tslint:disable no-unused-expression newline-per-chained-call */
import { expect } from 'chai'
import 'mocha'
import index from './index'

describe('permission/index', () => {
  it('should export an object with `types` and `resolvers`', (done: () => void) => {
    expect(index).to.haveOwnProperty('types')
    expect(index).to.haveOwnProperty('resolvers')
    done()
  })

  it('should have a Query property on the resolvers', (done: () => void) => {
    expect(index.resolvers).to.haveOwnProperty('Query')
    done()
  })

  it('should have a Subscription property on the resolvers', (done: () => void) => {
    expect(index.resolvers).to.haveOwnProperty('Subscription')
    done()
  })
})