module.exports = {
  slowLog,
  series,
  randomNumber
}

function randomNumber (min, max) {
  return Math.random() * (max - min) + min;
}

function slowLog(t, iterator, min, max, done) {
  let next = iterator.next()

  if (next === undefined || next === null) {
    return done()
  }

  t.print(next.replace(/\t/g, '') + '<br/>')

  setTimeout(() => {
    slowLog(t, iterator, min, max, done)
  }, randomNumber(min, max))
}

function series (ops, done) {
  const op = ops.shift()

  op((err, res) => {
    if (err) {
      return done(err)
    }

    if (!ops.length) {
      return done(null, res)
    }

    return series(ops, done)
  })
}
