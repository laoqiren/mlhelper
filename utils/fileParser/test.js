const parser = require('./index');
const path = require('path');
const charts = require('../charts/index');
const kNN = require('../../algorithm/kNN/index');

let dt = parser.read_csv(path.join(__dirname,'./train.csv'),{
    index_col: 0,
    delimiter: ',',
    header: 0,
    dataType: 'number'
});

let labels = dt.getClasses();

let dataSet =dt.drop('quality').values;

let knn = new kNN(dataSet,labels);
let inx = [7.0,0.27,0.36,20.7,0.045,45.0,170.0,1.001,3.0,0.45,8.8],
    normalInx = knn.autoNormalVector(inx);

console.log(knn.classify(inx,100)); // 6

charts.drawkNN(kNN.autoNormal(dataSet),labels,normalInx,{
    width: "500px",
    height: "400px",
    size: 15
});
