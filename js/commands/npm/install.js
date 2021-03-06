import {
  npmInstallLog
} from './util'

export default {
  handler: (args, session) => {
    return npmInstallLog({
      name: args._[0],
      dependencies: [
        'dnscache',
        'express-http-proxy',
        'ipfsd-ctl',
        'ipfs-http-client',
        'ipfs',
        'express',
        'debug',
        'once',
        'request',
        'rc',
        'request-promise',
        'yargs',
        '@yarnpkg%2flockfile',
        'ipfs-registry-mirror-common',
        'which-promise'
      ]
    })
  }
}
