const fs = require('../system/fs')

module.exports = {
  handler: (t, args) => {
    const { _ } = args

    if (!_.length) {
      throw new Error('usage: touch [-A [-][[hh]mm]SS] [-acfhm] [-r file] [-t [[CC]YY]MMDDhhmm[.SS]] file ...')
    }

    fs.write(_[0], '', {
      uid: fs.user(500).uid,
      gid: fs.user(500).gid
    })

    return ''
  }
}
