import * as fs from 'fs';

const pathToFile = './numbers.txt'
const mark = 64 * 1024 * 100
const maxNumber = 1000000000
const minNumber = 1000000
const endFile = './end.txt'

const sortChunk = (chunkToString) => {
  if (chunkToString[0] === ',') {
    chunkToString = chunkToString.substring(1)
  }
  if (chunkToString.slice(-1) === ',') {
    chunkToString = chunkToString.substring(chunkToString[0], chunkToString.length - 1)
  }
  let arr = chunkToString.split(',')
  arr.sort((a, b) => a - b)
  return ({ sortedChunk: arr.join(','), minValue: arr[0] })
}

fs.writeFileSync(pathToFile, '')

const readStream = fs.createReadStream(pathToFile, { highWaterMark: mark })

let row = ''
while (fs.lstatSync(pathToFile).size / 1024 / 1024 < 100) {
  for (let i = 0; i < 100; i++) {
    row += Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber + ','
  }
  fs.appendFileSync(pathToFile, row)
}

let i = 0

let textForEndFile = ''

readStream.on('data', (chunk) => {
  ++i
  const result = sortChunk(chunk.toString())
  const writeStreamToOne = fs.createWriteStream('./' + i + '.txt')
  writeStreamToOne.write(result.sortedChunk)
  writeStreamToOne.end(() => {
    const read = fs.createReadStream('./' + i + '.txt')
    read.on('data', (chunk) => {
      const result = sortChunk(chunk.toString())
      textForEndFile += result.minValue + ', '
    })
  })
})

readStream.resume()
readStream.on('end', () => {
  let result = sortChunk(textForEndFile)
  fs.writeFileSync(endFile, result.sortedChunk)
})