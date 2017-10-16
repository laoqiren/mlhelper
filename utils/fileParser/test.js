const parser = require('./index');
const path = require('path');
const charts = require('../charts/index');
const kNN = require('../../algorithm/kNN/index');

let dt = parser.read_csv(path.join(__dirname,'./train.csv'),0,',',0);

let labels = dt.getClasses();

let dataSet =dt.drop('quality').values;

console.log(labels)
let knn = new kNN(dataSet,labels);
let inx = [7.0,0.27,0.36,20.7,0.045,45.0,170.0,1.001,3.0,0.45,8.8],
    normalInx = knn.autoNormalVector(inx);

console.log(knn.classify(inx,100)); // 6

charts.drawkNN(kNN.autoNormal(dataSet),labels,normalInx,"400px","300px",15);
