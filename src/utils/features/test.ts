import features from './index';
import * as parser from '../fileParser/index';
import * as path from 'path';

const preprocessing = features.preprocessing;

let dt = parser.read_csv(path.join(__dirname,'../../../assets/train.csv'),{
    index_col: 0,
    delimiter: ',',
    header: 0,
    dataType: 'number'
});

let dataSet =dt.drop('quality').values;

let testStandardScaler = preprocessing.standardScaler(dataSet);
console.log(testStandardScaler);

let testNormalize = preprocessing.normalize(dataSet);
console.log(testNormalize);