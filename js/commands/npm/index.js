const {
  slowLog
} = require('../../util')

const subCommands = {
  install: require('./install')
}

module.exports = {
  handler: (t, args) => {
    const subCommand = args._.shift()

    if (subCommands[subCommand]) {
      return subCommands[subCommand].handler(t, args)
    }

    return `<pre>Usage: npm <command>

where <command> is one of:
    ${Object.keys(subCommands).sort((a, b) => a.localeCompare(b))}

npm <command> -h  quick help on <command>
npm -l            display full usage info
npm help <term>   search for help on <term>
npm help npm      involved overview

Specify configs in the ini-formatted file:
    /home/alex/.npmrc
or on the command line via: npm <command> --key value
Config info can be viewed via: npm help config

npm@6.4.1 /home/alex/.nvm/versions/node/v10.15.3/lib/node_modules/npm</pre>`
  },
  args: {
    boolean: [
      'save', 'save-dev', 'production', 'g', 'global'
    ]
  }
}
