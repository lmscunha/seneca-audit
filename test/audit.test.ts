/* Copyright © 2024 Richard Rodger, MIT License. */

import { describe, test } from 'node:test'
import { expect } from '@hapi/code'

import Seneca from 'seneca'
import SenecaMsgTest from 'seneca-msg-test'


import Audit from '..'
import AuditMessages from './audit.messages'



describe('audit', () => {

  test('happy', async () => {
    expect(Audit).exist()

    const seneca = Seneca({ legacy: false }).test().use('promisify').use(Audit)
    await seneca.ready()
  })


  test('messages', async () => {
    const seneca = Seneca({ legacy: false }).test().use('promisify').use(Audit)
    await (SenecaMsgTest(seneca, AuditMessages)())
  })


  test('basic', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(Audit)
    await seneca.ready()
    expect(seneca.find_plugin('Audit')).exist()
  })

})
