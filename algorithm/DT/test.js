const DT = require('./index');
const parser = require('../../utils/fileParser/index');
const path = require('path');
const util = require('util')

let dataSet = parser.parseFile(path.join(__dirname,'./dt.txt'));

let labels = ['age','prescript','astigmatic','tearRate']
let dt = new DT(dataSet,labels);

let result = dt.classify(labels,["young","myope","no","reduced"])

console.log(util.inspect(dt.getTree(),{depth: null}));
console.log(result);

