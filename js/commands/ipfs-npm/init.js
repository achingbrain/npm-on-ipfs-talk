const fs = require('../../system/fs')
const users = require('../../system/users')
const {
  slowLog
} = require('../../util')

module.exports = {
  handler: (t, args) => {
    const pwd = fs.pwd()
    const proj = pwd.split('/').pop()

    const content = `{
  "name": "${proj}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`

    fs.write(`${pwd}/package.json`, content, users.ids('alex'))

    return `<pre>Wrote to ${pwd}/package.json:

    ${content}</pre>`
  },
  args: {
    boolean: [
      'y'
    ]
  }
}
