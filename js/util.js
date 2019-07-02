import delay from 'delay'

export function randomNumber (min, max) {
  return Math.random() * (max - min) + min;
}

export async function * slowLog (lines, min, max) {
  const start = Date.now()

  for await (let line of lines) {
    line = line.replace(/\t/g, '') + '<br/>'
    line = line.replace('%time%', Date.now() - start)

    yield line

    await delay(randomNumber(min, max))
  }
}
