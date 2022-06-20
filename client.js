const axios = require('axios')
const URI = 'http://localhost:3000'

console.log('client code running.')

const test = async () => {
  console.time('loading time: ')
  let data = await axios.get(`${URI}/user`)
  console.log(data.users)
  console.timeEnd('loading time: ')
}

const testGroup = async () => {
  await test()
}

test()
