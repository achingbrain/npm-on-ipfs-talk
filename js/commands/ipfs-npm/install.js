import {
  slowLog,
  randomNumber
} from '../../util'

export default {
  handler: (args, session) => {
    const pwd = session.env.PWD
    const pkg = `${pwd}/package.json`
    const content = session.fs.read(pkg)
    const manifest = JSON.parse(content)

    if (args._.length) {
      // install a package
      if (args.save) {
        manifest.dependencies = manifest.dependencies || {}
        manifest.dependencies[args._[0]] = '^9.0.0'

        session.fs.write(pkg, JSON.stringify(manifest, null, 2), session)
        session.fs.write(`${pwd}/package-lock.json`, `{
  "name": "${manifest.name}",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "${args._[0]}": {
      "version": "9.0.0",
      "resolved": "https://registry.js.ipfs.io/${args._[0]}/-/${args._[0]}-9.0.0.tgz",
      "integrity": "sha512-t/OYhhJ2SD+YGBQcjY8GzzDHEk9f3nerxjtfa6tlMXfe7frs/WozhvCNoGvpM0P3bNf3Gq5ZRMlGr5f3r4/N8A=="
    }
  }
}`, session)
        session.fs.mkdir(`${pwd}/node_modules`, session)
        session.fs.mkdir(`${pwd}/node_modules/${args._[0]}`, session)
        session.fs.write(`${pwd}/node_modules/${args._[0]}/package.json`, 'I am a very nice package', session)
        session.fs.write(`${pwd}/node_modules/${args._[0]}/index.js`, 'Look at me being an implementation', session)
      }

      return npmInstallSinglePackageLog(args._[0])
    } else {
      // install all of the packages
    }
  },
  args: {
    boolean: [
      'save'
    ]
  }
}

const npmInstallSinglePackageLog = (pkg) => {
  let logs = [
    '👩‍🚀 Starting local proxy',
    '🚀 Server running on port 60000',
    '🎁 Installing dependencies with /home/alex/.nvm/versions/node/v10.15.3/bin/npm',
    'npm info it worked if it ends with ok',
    'npm info using npm@6.4.1',
    'npm info using node@v10.15.3',
    '😈 Spawning an in-process IPFS node using repo at /home/alex/.jsipfs2',
    'Swarm listening on /ip4/127.0.0.1/tcp/60015/ipfs/QmVYDeLg2UsfvY1tYQuHDN5ioiCiengfNGimMFbnjyvbjb',
    'Swarm listening on /p2p-circuit/ipfs/QmVYDeLg2UsfvY1tYQuHDN5ioiCiengfNGimMFbnjyvbjb',
    'Swarm listening on /p2p-circuit/ip4/127.0.0.1/tcp/60015/ipfs/QmVYDeLg2UsfvY1tYQuHDN5ioiCiengfNGimMFbnjyvbjb',
    '🗂️  Loading registry index from https://registry.js.ipfs.io',
    '☎️  Dialling registry mirror /ip4/35.178.192.119/tcp/10036/ipfs/QmctQ4T1Sv1aBTtRhtzmRwvAf8svtHLPhJWWbv6wfVcrRN,/dns4/registry.js.ipfs.io/tcp/10036/ipfs/QmctQ4T1Sv1aBTtRhtzmRwvAf8svtHLPhJWWbv6wfVcrRN',
    '📱️ Connected to registry',
    `🆕 New versions of ${pkg} detected - 1.0.0, 1.0.1, 1.1.0, 1.1.1, 1.2.0, 1.2.1, 1.3.0, 1.4.0, 1.4.1, 1.5.0, 2.0.0, 2.0.1, 2.0.2, 2.0.3, 2.0.5, 2.0.6, 2.0.7, 2.0.8, 2.1.0, 2.1.1, 2.1.2, 2.1.3, 2.1.4, 2.2.0, 2.3.0, 2.4.0, 3.0.0, 3.0.1, 3.1.0, 3.1.1, 3.1.2, 4.0.0, 4.0.1, 4.0.2, 4.0.3, 4.0.4, 4.1.0, 5.0.0, 6.0.0, 7.0.0, 7.0.1, 7.0.2, 7.1.0, 7.2.0, 7.2.1, 8.0.1, 8.0.2, 8.1.1, 9.0.0, 8.1.0`,
    `📄 GET /${pkg} 200 2857ms`,
    `npm http fetch GET 200 http://localhost:60000/${pkg} 2907ms`,
    'npm WARN foo@1.0.0 No description',
    'npm WARN foo@1.0.0 No repository field.',
    ' ',
    '📄 POST /-/npm/v1/security/audits/quick 200 439ms',
    'npm timing audit submit Completed in 493ms',
    'npm http fetch POST 200 http://localhost:60000/-/npm/v1/security/audits/quick 492ms',
    'npm timing audit body Completed in 0ms',
    `+ ${pkg}@9.0.0`,
    'added 1 package from 1 contributor and audited 1 package in %time%ms',
    'found 0 vulnerabilities',
    ' ',
    'npm timing npm Completed in %time%ms',
    'npm info ok ',
    '🎁 /Users/alex/.nvm/versions/node/v10.15.3/bin/npm exited with code 0',
    '🔏 Updating package-lock.json'
  ]

  return slowLog(logs, 200, 500)
}
