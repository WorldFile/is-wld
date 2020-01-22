# is-wld
Identifies World Files (e.g., .gfw, .jgw, .j2w, .pgw, .tfw, and .wld)

# usage
# checking a file
```javascript
const isWorldFile = require("is-wld");
const { readFileSync } = require("fs");

const text = readFileSync("example.wld", 'utf-8');
const valid = isWorldFile(text);
// true
```

# checking a url
```javascript
const isWorldFile = require("is-wld");

const valid = isWorldFile('https://somefakeurlhere.com/example.pgw');
// true
```

# description
Identifies [World Files](https://en.wikipedia.org/wiki/World_file) in the following formats:
 - ArrayBuffer
 - Buffer
 - DataView
 - String
 - Uint8Array

# what is a world file?
https://en.wikipedia.org/wiki/World_file

# support
Post an issue at http://github.com/danieljdufour/is-wld/issues or email the author at daniel.j.dufour@gmail.com