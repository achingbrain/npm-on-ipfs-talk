const fs = require('../system/fs')

module.exports = {
  handler: (t, args) => {
    const { _ } = args

    if (!_.length) {
      _.push('/home/alex')
    }

    fs.cd(_[0])

    return ''
  }
}
