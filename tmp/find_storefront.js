const fs = require("fs");
const code = fs.readFileSync("/tmp/deployed_bundle.js", "utf8");

// Search for storefront rendered JSX
const needle = '"storefront"';
let pos = 0;
while (true) {
  const found = code.indexOf(needle, pos);
  if (found === -1) break;
  console.log(`Found "${needle}" at ${found}:`);
  console.log(code.substring(Math.max(0, found - 60), Math.min(code.length, found + 160)));
  console.log("------------------------------------------");
  pos = found + needle.length;
}
