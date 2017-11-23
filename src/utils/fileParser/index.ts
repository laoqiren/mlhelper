import * as fs from 'fs';
import * as _ from 'lodash';

interface ReadCsvConfig {
    index_col?: boolean | number;
    delimiter?: string;
    header?: Array<string> | number | boolean;
    dataType?: string;
    classType?: string;
}

interface WriteCsvConfig {
    index?: boolean;
    header?: any[];
    delimiter?: string;
}

interface ReadFileConfig {
    toNumber?: boolean;
    delimiter?: string;
}


/**
 * 简单读取文件，配置包括是否转化数据为数值型和分隔符号
 * 
 * @export
 * @param {string} filePath 
 * @param {object} options {
 * toNumber: {boolean}. whether transform datas to number or not. deault to false.
 * delmiter: {string}. delmiter for every line. default to '\t'.
 * } 
 * @returns {Array<Array<any>>}
 */
export function parseFile(filePath:string,{
    toNumber=false,
    delimiter='\t'
}={} as ReadFileConfig): Array<Array<any>>{
    let content = fs.readFileSync(filePath,{encoding: 'utf-8'});
    let lines = content.split('\n');
    let result = lines.map(line=>line.split(delimiter));

    if(toNumber){
       return result.map(v=>v.map(c=>Number(c)))
    }
    return result;
}

class CSV {
    values: Array<Array<any>>
    constructor(public headerLine: Array<string>,datasWithoutIndex: Array<Array<any>>){
        this.values = datasWithoutIndex;
    }
    /**
     * 获取标题行 Get the header line.
     * 
     * @returns {Array<string>} 
     * @memberof CSV
     */
    getHeader(): Array<string>{
        return this.headerLine;
    }
    /**
     * 删除某一行或者指定标题的列 delete the specific column.
     * 
     * @param {(string | number)} label delete the specific number of column or the column of specific label.
     * @returns {CSV} instance of class CSV.
     * @memberof CSV
     */
    drop(label: string | number): CSV{
        let headerLine = [...this.headerLine];
        let values = this.values.map(v=>[...v]);
        let labelIndex = typeof label === 'string'?headerLine.indexOf(label):label;

        if(headerLine.length !== 0){
            headerLine.splice(labelIndex,1);
        }
        values.forEach(v=>v.splice(labelIndex,1));

        return new CSV(headerLine,values);
    }
    /**
     * 获取分类列，一般为最后一列。 Get the last column of every line.
     * 
     * @returns {Array<any>} 
     * @memberof CSV
     */
    getClasses(): Array<any>{
        return this.values.map(v=>v[v.length-1])
    }
    
}

export {CSV};
/**
 * 读取csv文件 Read CSV file.
 * 
 * @export
 * @param {string} filePath 
 * @param {object} options {
 * index_col: {boolean|number}. when set to true, the first column of data will be regarded as the counter column. Default to be false.
 * delmiter: {string}. delmiter for every line. Default to be ','.
 * header: {Array<any>|number}. Can be the vector of custom header line or the index of the header line. default to 0.
 * dataType: {string}. the type of datas, default to 'number'.
 * classType: {string}. the type of the last column of each line. default to 'number'.
 * }
 * @returns {CSV} instance of class CSV.
 */
export function read_csv (filePath: string,{
    index_col=false,
    delimiter=',',
    header=0,
    dataType='number',
    classType='number'
}={} as ReadCsvConfig): CSV{
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
        datasWithoutIndex = datasWithoutIndex.map(row=>row.map(col=>{
            if(classType === 'number'){
                return Number(col);
            }
            return col;
        }))
    }
    return new CSV(headerLine,datasWithoutIndex);
}

/**
 * 写入CSV数据  Write datas to file.
 * 
 * @export
 * @param {string} filePath 
 * @param {any[][]} data datas to write.
 * @param {object} options {
 * index: {boolean}. if set to be true, it will add a index column for each line. default to false.
 * header: {Array<any>}. custom header to add to the first line. default to [].
 * }
 */
export function write_csv (filePath: string,data: any[][],{
    index=false,
    header=[],
    delimiter=','
}={} as WriteCsvConfig): void{
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