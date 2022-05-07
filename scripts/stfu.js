const fs = require('fs');

const codeToObscure = /console.warn\([\s\S].*"Require cycle: "/;
const problemFilePath = './node_modules/react-native/Libraries/Network/fetch.js';
const problemFileContent = fs.readFileSync(problemFilePath,'utf8');
fs.writeFileSync(problemFilePath,problemFileContent.replace(codeToObscure,'const noConsoleWarn = (""'),'utf8');