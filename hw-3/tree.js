const fs = require('fs')

const args = process.argv.slice(2)
let path = null
let depth = null
let folders = []

const scaner = (folder_path) => {
  let elements = fs.readdirSync(folder_path)
  elements.forEach(element => {
    let stat = fs.lstatSync(folder_path + '\\' + element)
    if (stat.isDirectory()) {
      let path = folder_path + '\\' + element
      folders.push(path)
      scaner(path)
    }
  })
}

const cutForDepth = (folders_path, path) => {
  let cuted_folders_path = []
  folders_path.forEach(folder => {
    let pos = path.length
    let i = 0
    while (i <= depth) {
      i = i + 1
      var foundPos = folder.indexOf('\\', pos)
      if (foundPos === -1) break
      pos = foundPos + 1
    }
    let finish_path = foundPos !== -1 ? folder.slice(0, pos - 1) : folder
    cuted_folders_path.push(finish_path)
  })
  return cuted_folders_path
}

const uniqueFoldersPath = (folders_path) => {
  let uniqueFolders = []
  folders_path.forEach(folder => {
    if (!~uniqueFolders.indexOf(folder)) {
      uniqueFolders.push(folder)
    }
  })
  return uniqueFolders
}

const splitElements = (path, files) => {
  let directory = { files: [], folders: [] }
  files.forEach(element => {
    fs.lstatSync(path + '\\' + element).isDirectory()
      ? directory.folders.push(element)
      : directory.files.push(element)
  })
  return directory
}

const collectObject = (path_to_folder) => {
  const files = fs.readdirSync(path_to_folder)
  const element = splitElements(path_to_folder, files)
  element.path = path_to_folder
  return element
}

if (args[0] === '--help') {
  console.log("Утилита для просмотра структуры каталога")
  console.log("node tree.js [-D, --depth глубина структуры] [путь до файла]")
  console.log("Примеры использования: \n node tree.js -D 2 C:\\path \n node tree.js C:\\path --depth 3")
} else if (args.length === 3) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-D" || args[i] === "--depth") {
      depth = args[i + 1]
      args.splice(i, 2)
    }
  }
  path = args[0]
  if (!path || !depth || !parseInt(depth, 10)) {
    console.log("Аргументы введены не корректно \n Введите 'node tree.js --help' для справки")
  } else {
    let directory = []
    scaner(path)
    const cutted_folders_path = cutForDepth(folders, path)
    const unique_folders_path = uniqueFoldersPath(cutted_folders_path)
    unique_folders_path.forEach(path => {
      directory.push(collectObject(path))
    })

    console.log('Выбран каталог: ' + path)
    console.log('Выбрана глубина: ' + depth)
    console.log(path)
    const drawRow = (object) => {
      let i = -1
      let pos = -1;
      let last
      let array_folders = []
      while ((pos = object.path.indexOf('\\', pos + 1)) != -1) {
        i = i + 1
        last = pos
        array_folders.push(object.path.slice(last, object.path.length))
      }
      let folder_name = object.path.slice(last + 1, object.path.length)
      let row = '|'
      if (i === 1) {
        row += '- '
      } else {
        for (let j = 1; j <= i; j++) {
          row = row + ' '
        }
        row += '*'
      }
      let files = '\n'
      if (object.files.length) {
        let index = (row + folder_name).match(/\w/)?.index
        let whitespace = '|'
        for (let k = 1; k < index; k++) {
          whitespace += ' '
        }
        object.files.forEach(file => {
          files += whitespace + '`-- ' + file + '\n'
        })
      }
      files = files.substring(0, files.length - 1)
      console.log(row + folder_name + files)
    }

    directory.forEach(folder => {
      drawRow(folder)
    })
  }
} else {
  console.log("Необходимо указать три аргумента! \n Введите 'node tree.js --help' для справки")
}

module.exports = { depth, path, folders, cutForDepth, uniqueFoldersPath, collectObject, scaner }