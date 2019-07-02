
import {
  createTerminal
} from 'terminatorator'
import npm from './commands/npm'
import ipfsNpm from './commands/ipfs-npm'

const commands = {
  '/usr/local/bin/npm': npm,
  '/usr/local/bin/ipfs-npm': ipfsNpm
}

export default (deck) => {
  try {
    createTerminal(document.getElementById('terminal'), {
      commands
    })
  } catch (err) {
    console.error(err)
  }

  console.info('hello!')
}
