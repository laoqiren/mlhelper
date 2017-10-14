const fs = require('fs');

exports.parseFile = function(filePath){
    let content = fs.readFileSync(filePath,{encoding: 'utf-8'});
    let lines = content.split('\n');
    let result = lines.map(line=>line.split('\t'));

    return result;
}