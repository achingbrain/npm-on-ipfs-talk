
module.exports = {
  handler: (t, args) => {
    if (!args._.length) {
      return t.getTheme()
    }

    if (args._.length > 1) {
      throw new Error('Too many arguments')
    }

    if (args._[0].match(/^interlaced|modern|white$/)) {
      t.setTheme(args[0])
      return ''
    }

    throw new Error('Invalid theme')
  }
}
