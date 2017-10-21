import DT from './index';
import * as parser from '../../utils/fileParser/index';
import * as path from 'path';
import * as util from 'util';


let dataSet = parser.parseFile(path.join(__dirname,'./dt.txt'));

let labels = ['age','prescript','astigmatic','tearRate']
let dt = new DT(dataSet,labels);

let result = dt.classify(labels,["young","myope","no","reduced"])

console.log(util.inspect(dt.getTree(),{depth: null}));
console.log(result);

