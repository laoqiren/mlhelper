import AdaBoost from './index';

const dataSet = [
    [1.0,2.1],
    [2.0,1.1],
    [1.3,1.0],
    [1.0,1.0],
    [2.0,1.0]
]
const labels = [1.0,1.0,-1.0,-1.0,1.0];

let ada = new AdaBoost(dataSet,labels,40);

let result = ada.classify([[1.0,2.1],
    [2.0,1.1],
    [1.3,1.0],
    [1.0,1.0],
    [2.0,1.0]]);

console.log(result);