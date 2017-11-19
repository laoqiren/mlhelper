import kMeans from './index';
import * as util from 'util';

const dataSet = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [6,9,10]
]

let kmeans = new kMeans(dataSet,3);

let result = kmeans.cluster();

console.log(util.inspect(result))