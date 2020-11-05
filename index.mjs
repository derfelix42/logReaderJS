import * as logReader from './logReader.mjs'

async function readStuff() {
  let lines = await logReader.read('path/to/file', 25)
  console.log(lines)
}
readStuff()
