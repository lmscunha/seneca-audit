# @seneca/audit

> _Seneca Audit_ is a plugin for [Seneca](http://senecajs.org)

Capture message run traces and durations.

[![npm version](https://img.shields.io/npm/v/@seneca/audit.svg)](https://npmjs.com/package/@seneca/audit)
[![build](https://github.com/senecajs/seneca-audit/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-audit/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-audit/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-audit?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-audit/badge.svg)](https://snyk.io/test/github/senecajs/seneca-audit)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19453/branches/505563/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19453&bid=505563)
[![Maintainability](https://api.codeclimate.com/v1/badges/9d54b38a991fe7b92a43/maintainability)](https://codeclimate.com/github/senecajs/seneca-audit/maintainability)

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

See the [test folder](test) for runnable examples, including the
`intercept` include/exclude filtering and nested message traces in
[`test/quick01.js`](test/quick01.js).

<!--START:options-->
<!--END:options-->

<!--START:action-list-->

## Action Patterns

<!--END:action-list-->

<!--START:action-desc-->

## Action Descriptions

<!--END:action-desc-->

## Options

This plugin accepts the following options:

- `active` (boolean, default `false`): Master switch. When `false`, no
  auditing is performed and the plugin adds negligible overhead.
- `ignore` (array, default `['plugin: define', 'plugin: init']`): Message
  patterns (Jsonic strings or objects) to exclude from auditing.
- `intercept` (object, default `{}`): Map of message patterns to capture. Each
  entry takes `{ include, exclude }`, where `include` is either `'*'` (all
  message properties) or an array of property names, and `exclude` is an array
  of property names to drop.
- `auditCallback` (function, default no-op): Invoked as
  `auditCallback({ meta, msg })` for each intercepted message, bound to the
  Seneca instance. Use it to persist or forward the captured data (for example
  saving a `sys/audit` entity).
- `debug` (boolean, default `false`): Enable additional debug behaviour.

## Motivation

Understanding how messages flow through a Seneca system — which messages run,
how long they take, and what data they carry — is essential for debugging and
performance work. _Seneca Audit_ hooks into the message lifecycle to capture
this trace and timing information without requiring changes to your message
handlers.

## Support

If you're using this plugin, feel free to contact us on Twitter if you have
any questions! [@senecajs](http://twitter.com/senecajs)

For help with Seneca in general, the [Senecajs org](https://github.com/senecajs/)
has a number of repositories that may be of use.

## API

The plugin exposes the captured audit state via the plugin exports:

- `seneca.export('audit/raw')()` — returns the raw internal audit data
  structure (`{ active, msg, trace, runs }`).

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation.
If you feel you can help in any way, be it with documentation, examples,
extra testing, or new features, please get in touch.

## Background

This open source module is sponsored and supported by
[Voxgig](https://www.voxgig.com).
