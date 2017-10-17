const fs = require('fs');
const _ = require('lodash');

exports.parseFile = function(filePath){
    let content = fs.readFileSync(filePath,{encoding: 'utf-8'});
    let lines = content.split('\n');
    let result = lines.map(line=>line.split('\t'));

    return result;
}

class CSV {
    constructor(headerLine,datasWithoutIndex){
        this.headerLine = headerLine;
        this.values = datasWithoutIndex;
    }
    getHeader(){
        return this.headerLine;
    }
    drop(label){
        let headerLine = [...this.headerLine];
        let values = this.values.map(v=>[...v]);
        let labelIndex = typeof label === 'string'?headerLine.indexOf(label):label;

        headerLine.splice(labelIndex,1);
        values.forEach(v=>v.splice(labelIndex,1));

        return new CSV(headerLine,values);
    }
    getClasses(){
        
        return this.values.map(v=>v[v.length-1])
    }
    
}

exports.read_csv = function(filePath,{
    index_col=false,
    delimiter=',',
    header=0,
    dataType='number'
}={}){
    let rawContent = fs.readFileSync(filePath,{encoding: 'utf-8'});

    let lines = rawContent.split('\n').map(v=>v.split(delimiter));
    let headerLine;
    if(Array.isArray(header)){
        headerLine = header;
    } else if(header === 0){
        headerLine = lines[0];
        lines = _.tail(lines);
    } else {
        headerLine = []
    }

    if(headerLine[0] === ''){
        headerLine = _.tail(headerLine)
    }

    let datasWithoutIndex = [];
    // 去除Index列
    if(index_col !== false){
        datasWithoutIndex = lines.map(v=>_.tail(v));
    } else {
        datasWithoutIndex = lines;
    }

    if(dataType === 'number'){
        datasWithoutIndex = datasWithoutIndex.map(row=>row.map(col=>Number(col)))
    }
    return new CSV(headerLine,datasWithoutIndex);
}

exports.write_csv = function(filePath,data,{
    index=false,
    header=[],
    delimiter=','
}={}){
    let dataToWrite = [...data];
    if(index !== false){
        dataToWrite.forEach((v,i)=>{
            v.unshift(i);
        });
    }
    if(Array.isArray(header) && header.length >= 1){
        dataToWrite.unshift(header);
    }
    dataToWrite = dataToWrite.map(row=>row.map(col=>col.toString()));
    let contentToWrite = '';

    dataToWrite.forEach(v=>{
        contentToWrite += v.join(delimiter);
        contentToWrite += '\n';
    });
    
    fs.writeFileSync(filePath,contentToWrite,{
        encoding: 'utf-8'
    });
}