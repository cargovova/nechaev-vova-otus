const args = process.argv.slice(2)
let path = null
let depth = null
if (args[0] === '--help') {
  console.log("Утилита для просмотра структуры каталога")
  console.log("node tree.js [-d, --depth глубина структуры] [путь до файла]")
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
  }
} else {
  console.log("Необходимо указать три аргумента! \n Введите 'node tree.js --help' для справки")
}

console.log(path)
console.log(depth)