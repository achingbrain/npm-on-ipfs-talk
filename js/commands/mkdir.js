const fs = require('../system/fs')
const users = require('../system/users')

module.exports = {
  handler: (t, args) => {
    const { _ } = args

    if (!_.length) {
      throw new Error('usage: mkdir [-pv] [-m mode] directory ...')
    }

    for(let i = 0; i < _.length; i++) {
      fs.mkdir(_[i], {
        uid: users.find('alex').uid,
        gid: users.find('alex').gid,
        p: args.p
      })
    }

    return ''
  },
  args: {
    boolean: [
      'p'
    ]
  }
}
