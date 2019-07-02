import {
  slowLog
} from '../../util'
import parser from 'yargs-parser'
import init from './init'
import install from './install'

const subCommands = {
  init,
  install
}

export default {
  handler: (args, session) => {
    const subCommand = subCommands[args._.shift()]

    if (subCommand) {
      if (subCommand.args) {
        args = parser(session.env._, subCommand.args)
        args._ = args._.slice(2)
      }

      return subCommand.handler(args, session)
    }

    const log = [
      '👩‍🚀 Starting local proxy',
      '🚀 Server running on port 49820',
      '🎁 Installing dependencies with /Users/alex/.nvm/versions/node/v10.15.3/bin/npm',
      'npm info it worked if it ends with ok',
      'npm info using npm@6.4.1',
      'npm info using node@v10.15.3',

      `<pre>Usage: npm <command>

where <command> is one of:
    access, adduser, audit, bin, bugs, c, cache, ci, cit,
    completion, config, create, ddp, dedupe, deprecate,
    dist-tag, docs, doctor, edit, explore, get, help,
    help-search, hook, i, init, install, install-test, it, link,
    list, ln, login, logout, ls, outdated, owner, pack, ping,
    prefix, profile, prune, publish, rb, rebuild, repo, restart,
    root, run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, team, test, token, tst, un,
    uninstall, unpublish, unstar, up, update, v, version, view,
    whoami

npm <command> -h  quick help on <command>
npm -l            display full usage info
npm help <term>   search for help on <term>
npm help npm      involved overview

Specify configs in the ini-formatted file:
    /Users/alex/.npmrc
or on the command line via: npm <command> --key value
Config info can be viewed via: npm help config

npm@6.4.1 /Users/alex/.nvm/versions/node/v10.15.3/lib/node_modules/npm
🎁 /Users/alex/.nvm/versions/node/v10.15.3/bin/npm exited with code 1
🤷 No package-lock.json found</pre>`
    ]

    return slowLog(log, 50, 200)
  },
  args: {
    boolean: [
      'save',
      'y'
    ]
  }
}
