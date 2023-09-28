// fs.readFile('file.txt', (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log(data)
//   })
  

// Using async/await
// import {promisify} from 'util'

// const wait = (time) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, time)
//     })
// }

// const run = async () => {
//     await wait(1000)
//     wait(2000)
//     console.log('done')
// }

// For FS module

import fs from 'node:fs/promises'

// const readPjson = async () => {
//     const pjsonPath = new URL('./package.json', import.meta.url).pathname
//     console.log(JSON.parse(await fs.readFile(pjsonPath, 'utf-8') ))
// }

// readPjson()

const writeFile = async () => {
    const newFile = new URL('./demo.js', import.meta.url).pathname
    await fs.writeFile(newFile, `console.log('hello world')`)
}

writeFile()