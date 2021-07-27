const { depth, path, folders, cutForDepth, uniqueFoldersPath, collectObject, scaner } = require('./tree')

const elemIntoFolders = ['C:\\Users\\Public\\Documents']

test('should be exist args', () => {
  expect(depth).toBeTruthy()
  expect(path).toBeTruthy()
})

test('should folders is Array. scanner push to folders[]', () => {
  scaner(path)
  expect(Array.isArray(folders)).toBeTruthy()
  expect(folders.length).toBeTruthy()
  expect(folders).toEqual(expect.arrayContaining(elemIntoFolders))
})

test('should be cuted for depth', () => {
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
  const folders = [
    'C:\\test\\first',
    'C:\\test\\first\\ff',
    'C:\\test\\second',
    'C:\\test\\second\\ll',
    'C:\\test\\second\\ss',
    'C:\\test\\second\\ss',
    'C:\\test\\third'
  ]
  const isArrayUnique = arr => Array.isArray(arr) && new Set(arr).size === arr.length
  expect(isArrayUnique(uniqueFoldersPath(folders))).toBeTruthy()
})

test('should be setting depth', () => {
  expect(collectObject(path)).toMatchObject({
    files: expect.any(Array),
    folders: expect.any(Array),
    path: expect.stringMatching(/\w:(..\w+)+/)
  })
})