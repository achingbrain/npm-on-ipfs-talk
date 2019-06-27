const fs = require('../system/fs')

module.exports = {
  handler: (t, args) => {
    const { _ } = args

    if (!_.length) {
      throw new Error('usage: rm [-f | -i] [-dPRrvW] file ... unlink file')
    }

    for(let i = 0; i < _.length; i++) {
      fs.rm(_[i], args)
    }

    return ''
  },
  args: {
    boolean: [
      'r',
      'f'
    ]
  }
}
