const { vol } = require('memfs')
jest.mock('fs')

const path = '\\dir'
const depth = 2
const key = '-D'
process.argv.push(key, depth, path)

describe('test tree', () => {

  beforeAll(() => {
    if(process.argv[2] === '--coverage') {
      process.argv.shift()
    }
    vol.fromJSON(
      {
        '\\dir\\first\\first.js': 'first',
        '\\dir\\first\\first.md': 'first',
        '\\dir\\first\\first.js': 'first',
        '\\dir\\first\\first.md': 'first',
        '\\dir\\second\\second.js': 'second',
        '\\dir\\second\\second.md': 'second',
        '\\dir\\second\\sub_second\\sub_second.js': 'second',
        '\\dir\\second\\sub_second\\sub_second.md': 'second',
      }
    )
  })

  afterAll(() => {
    vol.reset()
  })

  test('should folders is Array. scanner push to folders[]', () => {
    const { folders, scaner } = require('./tree')
    scaner(path)
    expect(Array.isArray(folders)).toBeTruthy()
    expect(folders).toEqual(expect.arrayContaining(['\\dir\\first']))
  })

  test('should be cuted for depth', () => {
    const { folders, cutForDepth } = require('./tree')
    let isCutted = true
    let i = 0
    let pos = path.length
    const checkDepth = (el) => {
      const findedPos = el.indexOf('\\', pos)
      if (findedPos !== -1) {
        i = i + 1
        pos = findedPos + 1
        checkDepth(el)
      }
    }
    let elems = []
    cutForDepth(folders, path).forEach(element => {
      elems.push(element)
      i = 0
      pos = path.length
      checkDepth(element)
      if (i > depth) { isCutted = false }
    })
    expect(isCutted).toBeTruthy()
  })

  test('should be unique elements', () => {
    const { folders, uniqueFoldersPath } = require('./tree')
    const isArrayUnique = arr => Array.isArray(arr) && new Set(arr).size === arr.length
    expect(isArrayUnique(uniqueFoldersPath(folders))).toBeTruthy()
  })

  test('should be setting depth', () => {
    const { collectObject } = require('./tree')
    expect(collectObject(path)).toMatchObject({
      files: expect.any(Array),
      folders: expect.any(Array),
      path: expect.stringMatching(/(\\\w+)+/)
    })
  })
})