const addSum = (a, b, callback) => {
  setTimeout(() => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return callback('a, b must be numbers')
    }
    callback(undefined, a + b)
  }, 3000)
}

addSum(10, 10, (error1, sum) => {
  if (error1) return console.log({ error1 })
  console.log({ sum1 })
  addSum(sum1, 15, (error2, sum2) => {
    if (error2) return console.log({ error2 })
    console.log({ sum2 })
  })
})

let callback = (error, sum) => {
  if (error) return console.log({ error })
  console.log({ sum })
}

addSum(10, 'asdf', callback)
