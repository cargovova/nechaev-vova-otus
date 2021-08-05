import * as fs from 'fs';

const pathToFile = './numbers.txt'
const markForTenFiles = 64 * 1024 * 100
const maxNumber = 1000000000
const minNumber = 1000000
const endFile = './end.txt'

var sortChunk = (chunkToString) => {
  let str = chunkToString
  if (chunkToString[0] === ',') {
    str = chunkToString.substring(1)
  }
  if (chunkToString[chunkToString.length] === ',') {
    str = chunkToString.substring(chunkToString.length)
  }
  let arr = str.split(',')
  arr.sort((a, b) => {
    return a - b
  })
  return ({ sortedChunk: arr.join(','), minValue: arr[0] })
}

try {
  fs.lstatSync(pathToFile) || null
  fs.writeFileSync(pathToFile, '')
  console.log("Файл numbers.txt уже существует в текущей директории.")
} catch (error) {
  fs.writeFileSync(pathToFile, '')
  console.log("Создан файл numbers.txt в текущей директории.")
}

const readStream = fs.createReadStream(pathToFile, { highWaterMark: markForTenFiles })

let row = ''
while (fs.lstatSync(pathToFile).size / 1024 / 1024 < 100) {
  for (let i = 0; i < 100; i++) {
    row += Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber + ','
  }
  fs.appendFileSync(pathToFile, row)
}

let i = 0

let readableStreams = []
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
      let i = 0
      console.log(i + "| Запись min " + result.minValue)
    })
    readableStreams.push(read)
  })
  console.log("Запись в файл: " + './' + i + '.txt')
})
