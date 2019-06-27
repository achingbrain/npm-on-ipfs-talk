const fs = require('../system/fs')

module.exports = {
  handler: () => {
    return fs.pwd()
  }
}
