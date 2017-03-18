const fs = require('fs')
const Promise = require('bluebird');
const fsp = Promise.promisifyAll(require('fs'));

// these functions access the file system
// they all return promises

const getAllFiles = (dir) => {
  return fsp.readdirAsync(dir)
  .then(allFileNames => {
    const statPromises = allFileNames.map(fileName => {
      return fsp.statAsync(dir + fileName)
      .then(stats => {
        stats.filePath = dir + fileName + '/'
        stats.fileBool = stats.isFile()
        return stats
      })
    })
    return Promise.all(statPromises)
  })
}

const readFile = dir => {
  return fsp.readFileAsync(dir)
  .then(text => text)
}

// files.post('/files/read', (req, res, next) => {
//   console.log('file path is: ', req.body.filePath)
//   fsp.readFileAsync(req.body.filePath)
//   .then(text => {
//     res.send(text)
//   })
//   .catch(next)

// })

module.exports = {
  getAllFiles,
  readFile
}
