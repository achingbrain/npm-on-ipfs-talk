const users = require('./users')
const groups = require('./groups')
const fs = require('./fs')

module.exports = () => {
  groups.add('root')
  groups.add('wheel')
  groups.add('staff')
  groups.add('alex')

  userAdd('root', [])
  userAdd('alex', ['wheel', 'staff'])

  fs.cd('/home/alex')
}

function userAdd (name, groups) {
  let home = `/home/${name}`

  if (name === 'root') {
    home = '/root'
  }

  users.add(name, home, name, groups)

  if (name === 'root') {
    fs.mkdir(home, users.ids('root'))
  } else {
    fs.mkdir('/home', users.ids('root'))
    fs.mkdir(home, users.ids(name))
  }

  fs.mkdir(`${home}/Documents`, users.ids(name))
  fs.mkdir(`${home}/Code`, users.ids(name))
  fs.write(`${home}/.bash_history`, `ls
  ls
  mkdir
  rm -rf /`, users.ids(name))
  fs.write(`${home}/.bash_profile`, `source /etc/profile

  export NVM_DIR="/${home}}/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

  nvm use 10`, users.ids(name))
}
