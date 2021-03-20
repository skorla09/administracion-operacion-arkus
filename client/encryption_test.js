const bcrypt = require('bcrypt')


const encrypt = async (password) => {
  const hashed = bcrypt.hashSync(password, 10)
  console.log(hashed)
  return hashed
}

const verify = async (password, hash) => {
  const valid = await bcrypt.compareSync(password, hash)
  console.log('VERIFY1')
  console.log(valid)
  return valid
}

async function myFunc() {
  const hash1 = await encrypt('123456ABC')
  const hash2 = await encrypt('Carlos')

  console.log('HASH 1')
  console.log(hash1)


  const checkequal = await verify('123456ABC', '$2b$10$eKjTMDRTNq3UO/zN4xBFw.k2PiKXVlHzCZ7EVY9NDCmRqXVOfZVm6')
  console.log('HASHES ARE EQUAL')
  console.log(checkequal)
}

myFunc()