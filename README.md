![Seneca Audit](http://senecajs.org/files/assets/seneca-logo.png)

> _Seneca Audit_ is a plugin for [Seneca](http://senecajs.org)

Capture message run traces and durations.

[![npm version](https://img.shields.io/npm/v/@seneca/audit.svg)](https://npmjs.com/package/@seneca/audit)
[![build](https://github.com/senecajs/seneca-audit/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-audit/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-audit/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-audit?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-audit/badge.svg)](https://snyk.io/test/github/senecajs/seneca-audit)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19453/branches/505563/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19453&bid=505563)
[![Maintainability](https://api.codeclimate.com/v1/badges/9d54b38a991fe7b92a43/maintainability)](https://codeclimate.com/github/senecajs/seneca-audit/maintainability)

# @seneca/audit

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

## Install

```sh
$ npm install @seneca/audit
```

## Quick Example

```js
const Seneca = require('seneca')

const seneca = Seneca({ legacy: false })
  .use('promisify')
  .use('entity', { mem_store: true })
  .use('audit', {
    // Auditing is off by default; turn it on.
    active: true,

    // Capture selected message properties for matching patterns.
    intercept: {
      'a:1': { include: '*', exclude: [] },
      'b:1': { include: ['b', 'x'], exclude: [] },
    },

    // Called for each intercepted message.
    auditCallback: async function (data) {
      const seneca = this
      await seneca.entity('sys/audit').save$({ msg: { ...data.msg } })
    },
  })

  .message('a:1', async function a1(msg) {
    return { x: 1 + msg.x }
  })

  .message('b:1', async function b1(msg) {
    return this.post('a:1', { x: msg.x })
  })

await seneca.ready()

await seneca.post('a:1', { x: 1 })

// Inspect the captured audit records.
console.log(await seneca.entity('sys/audit').list$())
```

## More Examples

## Motivation

## Support

## API

## Contributing

## Background
