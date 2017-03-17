const fs = require('fs')
const Promise = require('bluebird');
const fsp = Promise.promisifyAll(require('fs'));


const getAllFiles = (dir) => {
  return fsp.readdirAsync(dir)
  .then(allFileNames => {
    console.log('allFileNames', allFileNames)
    const statPromises = allFileNames.map(fileName => {
      console.log('filename:', fileName)
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


//   getAllFiles(req.body.dir)
//   .then(arr => {
//     res.json(arr)
//   })
//   .catch(next)

// })

// files.post('/files/read', (req, res, next) => {
//   console.log('file path is: ', req.body.filePath)
//   fsp.readFileAsync(req.body.filePath)
//   .then(text => {
//     res.send(text)
//   })
//   .catch(next)

// })

module.exports = {
  getAllFiles
}
