import kMeans from './index';
import * as util from 'util';
import * as path from 'path';
import * as fileParser from '../../utils/fileParser';

let dataSet = <Array<Array<number>>> fileParser.parseFile(path.join(__dirname,'./testSet.txt'),true);

let kmeans = new kMeans(dataSet,5);

let result = kmeans.cluster();
console.log(util.inspect(result))