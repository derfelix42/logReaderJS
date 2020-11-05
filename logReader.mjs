import fs from "fs";

/**
 *  Read the last n files of a file efficiently - without reading in the entire file
 *  This is achived by getting the length of the file and starting to read backwards from the end.
 *  Written by: Felix Viola (felixviola.de)
 *
 *  @param  {string}    file_path     - path to the file to be read
 *  @param  {int}       maxLineCount  - max number of lines to be read in (may be less if file is shorter) - default: 10
 *  @param  {encoding}  encoding      - specifies the character encoding to be used - default: utf8
 *
 *  @return {array} an array of Strings representing each line of the read file - lines orderd like in original file
 */

export async function read(file_path, maxLineCount=10, encoding='utf8') {
  let stat = await fs.promises.stat(file_path)
  let file = await fs.promises.open(file_path, "r")

  const NEW_LINE_CHARACTERS = ["\n"];

  let lineCount = 0
  let chars = 0
  let lines = ""

  while(lineCount < maxLineCount) {
    if(chars >= stat.size) {
      break;
    }

    const buf = Buffer.alloc(1)
    await file.read(buf, 0, 1, stat.size - 1 - chars)
    let nextCharacter = buf.toString(encoding)
    lines = nextCharacter + lines
    if (NEW_LINE_CHARACTERS.includes(nextCharacter) && lines.length > 1) {
      lineCount++;
    }
    chars++
  }

  lines = lines.split('\n').filter(line => line !== '')
  file.close()

  return lines
}
