const kNN = require('../kNN');

let knn = new kNN([
    [1.,1.1],
    [1.,1.],
    [0.,0.],
    [0.,0.1]
],['A','A','B','C']);

let result = knn.classify([1.1,0.8],4);

console.log(result)