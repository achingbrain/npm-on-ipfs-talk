const Terminal = require('dom-terminal/lib/terminal')
const parser = require('yargs-parser')
const boot = require('./system/boot')

const commands = {
  ls: require('./commands/ls'),
  pwd: require('./commands/pwd'),
  mkdir: require('./commands/mkdir'),
  touch: require('./commands/touch'),
  cat: require('./commands/cat'),
  cd: require('./commands/cd'),
  rm: require('./commands/rm'),
  clear: require('./commands/clear'),
  theme: require('./commands/theme'),
  version: require('./commands/version'),

  npm: require('./commands/npm'),
  'ipfs-npm': require('./commands/ipfs-npm')
}

commands.help = {
  handler: (t, args) => {
    return `Commands: ${Object.keys(commands).sort((a, b) => a.localeCompare(b))}<br>More help available <a class="external" href="http://github.com/sasadjolic/dom-terminal" target="_blank">here</a>`
  }
}

module.exports = (deck) => {
  try {
    const terminal = new Terminal('terminal', {}, {
      execute: function(cmd, args) {
        const command = commands[cmd]

        if (!command) {
          return false
        }

        try {
          args = parser(args, command.args)

          let output = command.handler(terminal, args)

          if (output === undefined || output === null) {
            output = ''
          }

          if (typeof output === 'string') {
            output = output.replace(/\t/g, '')
          }

          return output
        } catch (err) {
          console.error(err)
          return err.message
        }
      }
    })

    boot()
  } catch (err) {
    console.error(err)
  }
}
