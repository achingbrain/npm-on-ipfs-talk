import {
  slowLog,
  randomNumber
} from '../../util'

export function npmInstallLog (pkg) {
  let deps = [
    'npm info it worked if it ends with ok',
    'npm info using npm@6.4.1',
    'npm info using node@v10.15.3',
    `npm http fetch GET 304 https://registry.npmjs.org/${pkg.name} 997ms (from cache)`,
    'npm timing stage:loadCurrentTree Completed in 6248ms',
    'npm timing stage:loadIdealTree:cloneCurrentTree Completed in 36ms',
    'npm timing stage:loadIdealTree:loadShrinkwrap Completed in 2452ms'
  ]

  pkg.dependencies.forEach(dep => {
    deps.push(`npm http fetch GET 304 https://registry.npmjs.org/${dep} ${randomNumber(100, 500)}ms (from cache)`)
  })

  pkg.dependencies.forEach(dep => {
    deps.push(`npm info lifecycle ${dep}@0.8.0~postinstall: ${dep}@0.8.0`)
  })

  deps = deps.concat([
    'npm timing action:postinstall Completed in 391ms',
    'npm timing stage:executeActions Completed in %time%ms',
    'npm timing stage:rollbackFailedOptional Completed in 2ms',
    'npm timing stage:runTopLevelLifecycles Completed in %time%ms',
    `+ ${pkg.name}@0.16.3`,
    'added 163 packages from 285 contributors and updated 1132 packages in 97.761s',
    'npm timing npm Completed in %time%ms',
    'npm info ok'
  ])

  return slowLog(deps, 100, 200)
}
