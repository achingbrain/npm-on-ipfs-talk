
export default {
  handler: (args, session) => {
    const pwd = session.env.PWD
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

    session.fs.write(`${pwd}/package.json`, content, session)

    return `<pre>Wrote to ${pwd}/package.json:

    ${content}</pre>`
  },
  args: {
    boolean: [
      'y'
    ]
  }
}
