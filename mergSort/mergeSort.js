import * as fs from 'fs';

const beginFile = './begin.txt'
const endFile = 'end.txt'
const firstArray = [6, 5, 0, 3, 1, 11, 13, 10, 15, 16]
const secondArray = [19, 14, 12, 17, 18, 8, 7, 2, 4, 9]
const markBufferSize = 10240000

const writeBegin = fs.createWriteStream(beginFile)
const writeEnd = fs.createWriteStream(endFile)

let i = 0
let endArray = []
let intermediateArray = []

for (let i = 0; i < 10; i++) {
  let buffer = new ArrayBuffer(markBufferSize)
  let view = new Uint8Array(buffer)
  view[0] = firstArray[i]
  view[1] = secondArray[i]
  writeBegin.write(view)
}


writeBegin.end(() => {
  const readStream = fs.createReadStream(beginFile, { highWaterMark: markBufferSize })
  readStream.on('data', (chunk) => {
    ++i
    writeEveryStream(chunk[0], chunk[1], i)
  })
})

const writeEveryStream = (firstChunk, secondChunk, i) => {
  let arr = [firstChunk, secondChunk]
  arr.sort((a, b) => a - b)
  const writeOneStream = fs.createWriteStream('./' + i + '.txt')
  let buffer = new ArrayBuffer(10240000)
  let view = new Uint8Array(buffer)
  view[0] = arr[0]
  view[1] = arr[1]
  writeOneStream.write(view)
  writeOneStream.end(() => {
    readFromOne(i)
  })
}

const readFromOne = (i) => {
  const readEveryFile = fs.createReadStream('./' + i + '.txt', { highWaterMark: markBufferSize })
  readEveryFile.on('data', (chunk) => {
    let currentArray = [chunk[0], chunk[1]]
    intermediateArray = endArray
    endArray = []
    while (intermediateArray.length && currentArray.length) {
      intermediateArray[0] < currentArray[0]
        ? endArray.push(intermediateArray.shift())
        : endArray.push(currentArray.shift())
    }
    endArray = [...endArray, ...intermediateArray, ...currentArray]
  })
  readEveryFile.resume()
  readEveryFile.on('end', () => {
    if (endArray.length === firstArray.length + secondArray.length) {
      let buffer = new ArrayBuffer(102400000)
      let view = new Uint8Array(buffer)
      for (let j = 0; j < endArray.length; j++) {
        view[j] = endArray[j]
      }
      writeEnd.write(view)
      console.log(endArray)
    }
  })
}