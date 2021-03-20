// to use swagger with json files
const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:3001/swagger.json',
        name: 'Team Admin API Version 1'
      },
    ]
  }
}


module.exports = options