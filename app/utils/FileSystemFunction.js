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
        if (!stats.isFile()) {
          stats.files = [];
          getAllFiles(stats.filePath)
          .then(fileNames => {
            stats.files = stats.files.concat(fileNames)
          })
        }
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

const writeFile = (dir, text) => {
  return fsp.writeFileAsync(dir, text)
}


module.exports = {
  getAllFiles,
  writeFile,
  readFile
}
