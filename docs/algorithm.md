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
### autoNormalVector(inx: Array<number>): Array<number>
Normalize the test data vectors so that each feature is concentrated between 0 and 1.

### static autoNormal(dataSet: Array<Array<number>>): Array<Array<number>>
Normalize the dataset matrix so that each feature is concentrated between 0 and 1.
## DT(ID3) Decision tree

### constructor(dataSet: Array<Array<any>>,labels: Array<string>,alg: string="ID3")

*dataSet:* The two dimensional array of data sets with known classifications(every row including the class).

*labels:* Classification vector of dataset.

*alg:* Algorithm to create decision tree. Default is ID3. By now, only ID3 is supported.

### classify(featLabels: Array<string>,testVec: Array<any>): any
*featLabels:* vector of feature names.

*testVec:* vector of test data.

### getTree(): object

return the created decision tree.

```js
const DT = require('mlhelper').algorithm.DT;

let dataSet = parser.parseFile(path.join(__dirname,'./dt.txt'));

let labels = ['age','prescript','astigmatic','tearRate']
let dt = new DT(dataSet,labels);

let result = dt.classify(labels,["young","myope","no","reduced"]) //no lenses

console.log(dt.getTree()); // { tearRate: { reduced: 'no lenses', normal: { astigmatic: [Object] } } }
```

### storeTree(filePath: string): Promise

store the decision tree to file and returns Promise object.

### static classifyFromTree(inputTree: object,featLabels: Array<string>,testVec: Array<any>): any

Classify the data according to the existing decision tree. The meaning of the parameter refers to the above explanation.