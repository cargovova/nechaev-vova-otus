const tree = require('./tree')

test('should be exist args', () => {
  expect(tree.depth).toBe("2")
  expect(tree.path).toBe("C:\\test")
})

test('should array length more 0', () => {
  expect(tree.folders.length).toBeTruthy()
})

test('should be setting depth', () => {
  expect(tree.cutForDepth.length).toBeTruthy()
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
  expect(isArrayUnique(tree.uniqueFoldersPath(folders))).toBeTruthy()
})

test('should be setting depth', () => {
  expect(tree.collectObject('C:\\test\\first')).toMatchObject({
    files: expect.any(Array),
    folders: expect.any(Array),
    path: expect.stringMatching(/\w:(..\w+)+/)
  })
})