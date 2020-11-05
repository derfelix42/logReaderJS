# Read the last lines from a (log-) file in NodeJS async

I just needed to read the last few lines of a log-file. Reading the entire file into memory just to get the last few lines would be horribly inefficient - considering that log-files can get extremely large. So a different strategy was needed...

After a bit of research I found a library that can do this but was old, clunky and included a even older and deprecated library. So I looked at the code and recreated it in a more modern way using the newest ECMAScript and asynchrones working.

`async function read(file_path, maxLineCount=10, encoding='utf8')`

You can use it like:

```
import * as logReader from './logReader.mjs'

async function readStuff() {
  let lines = await logReader.read('path/to/file', 25)
  console.log(lines)
}
readStuff()
```

Further increases in efficiency are desired and welcome 😏
