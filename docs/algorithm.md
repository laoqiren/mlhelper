# Algorithms

## kNN (k-nearest neighbors algorithm)

### constructor(dataSet: Array<Array<number>>,labels: Array<any>)

**dataSet**: The two dimensional array data for training.

**labels**: Classification vector of test data.
```js
const kNN = require('mlhelper').algorithm.kNN;

let knn = new kNN([
    [1.,1.1],
    [1.,1.],
    [0.,0.],
    [0.,0.1]
],['A','A','B','C']);

let result = knn.classify([1.1,0.8],4);

console.log(result)
```