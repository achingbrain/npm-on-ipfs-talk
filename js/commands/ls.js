const fs = require('../system/fs')
const users = require('../system/users')
const groups = require('../system/groups')

module.exports = {
  handler: (t, args) => {
    let files = fs.ls(args._[0])
    files = files.sort((a, b) => a.name.localeCompare(b.name))

    if (!args.a) {
      files = files.filter(file => file.name.substring(0, 1) !== '.')
    }

    if (args.l) {
      return `
      <table><tbody>
        ${
          files
          .map(child => {
            const node = child.node
            const date = node.mtime.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })

            return `<tr>
              <td>${node.children ? 'd' : '-'}rw-r--r--&nbsp;</td>
              <td>${users.find(node.uid).name}&nbsp;</td>
              <td>${groups.find(node.gid).name}&nbsp;</td>
              <td>${node.size()}&nbsp;</td>
              <td>${date}&nbsp;</td>
              <td>${child.name}</td>
            </tr>`
          }).join('')
        }
      <tbody></table>`
    }

    return files
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(file => file.name)
      .join(' ')
  },
  args: {
    boolean: [
      'l',
      'a'
    ]
  }
}
