import * as fs from 'fs';

const pathToFile = './numbers.txt'
const mark = 64 * 1024 * 100
const maxNumber = 1000000000
const minNumber = 1000000
const endFile = './end.txt'

const sortChunk = (chunkToString) => {
  let str = chunkToString
  if (chunkToString[0] === ',') {
    str = chunkToString.substring(1)
  }
  if (chunkToString.slice(-1) === ',') {
    str = chunkToString.substring(chunkToString.length)
  }
  let arr = str.split(',')
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

const writeToEnd = fs.createWriteStream(endFile)

readStream.on('data', (chunk) => {
  ++i
  const result = sortChunk(chunk.toString())

  const writeStreamToOne = fs.createWriteStream('./' + i + '.txt')
  writeStreamToOne.write(result.sortedChunk)
  writeStreamToOne.end(() => {
    const read = fs.createReadStream('./' + i + '.txt')
    read.on('data', (chunk) => {
      const result = sortChunk(chunk.toString())
      writeToEnd.write(result.minValue + ', ')
    })
  })
})

readStream.on('close', () => {
  let endFileText = fs.readFileSync(endFile)
  let result = sortChunk(endFileText.toString())
  fs.writeFileSync(endFile, result.sortedChunk)
})
