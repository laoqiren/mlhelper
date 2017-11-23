# Algorithms

## kNN (k-nearest neighbors algorithm)

To learn kNN: [https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
### constructor(dataSet: Array<Array<number>>,labels: Array<any>)

*dataSet:* The two dimensional array of data sets with known classifications.

*labels:* Classification vector of dataset.

### classify(inx: Array<number>,k: number): any
Classification based on feature vectors.

*inx:* data for testing.

*k:*  Make decisions based on K nearest neighbors.

```js
const kNN = require('mlhelper').algorithm.kNN;

let knn = new kNN([
    [1.,1.1],
    [1.,1.],
    [0.,0.],
    [0.,0.1]
],['A','A','B','C']);

let result = knn.classify([1.1,0.8],4);

console.log(result) // 'A'
```