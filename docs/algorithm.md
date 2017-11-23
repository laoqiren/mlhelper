# Algorithms

## kNN (k-nearest neighbors algorithm)

wiki: [https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
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
wiki: [https://en.wikipedia.org/wiki/Decision_tree](https://en.wikipedia.org/wiki/Decision_tree)
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

## Logistic regression
wiki: [https://en.wikipedia.org/wiki/Logistic_regression](https://en.wikipedia.org/wiki/Logistic_regression)

### constructor(dataMatIn: Array<Array<number>>,classLabels: Array<number>,numIter: number)
*dataMatIn* like dataset for training.

*classLabels:* the classes of training datas.

*numIter:* Maximum iterations

### classify(inX: Array<number>): number
Claasify the test data.

### getWeights(): Array<number>
 Random gradient ascent method for optimal regression coefficients of each feature.

```js
let logi = new Logistic(dataSet,labels,150);
let result = logi.classify(dataSet[i]);
let weights = logi.getWeights();
console.log(weights); //[ 2.9301940437635965, -5.7803993740016555, 9.834929045066424 ]
```

### AdaBoost
wiki: [https://en.wikipedia.org/wiki/AdaBoost](https://en.wikipedia.org/wiki/AdaBoost)
### constructor(dataSet: Array<Array<number>>,labels: Array<number>,numInt=40 as number)

*dataSet:* matirx like datas for training.

*labels:* vector of the training datas' classes.

*maximum:* permission iterative number of times, default is 40.

### classify(inx: Array<Array<number>>): Array<number>
*inx:* Matrix like for testing.

```js
const AdaBoost = require('mlhelper').algorithm.AdaBoost;
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

console.log(result); //[ 1, 1, -1, -1, -1 ]
```

### k-means clustering
wiki: [https://en.wikipedia.org/wiki/K-means_clustering](https://en.wikipedia.org/wiki/K-means_clustering)
### constructor(dataSet: Array<Array<number>>,k: number)
*dataSet:* Matrix like dataset to cluster.

*k:* how many centroids.

### cluster(max=50 as number): [Array<Array<number>>,Array<Array<number>>]

*max:* permission iterative number of times, default is 50.

*return:* will return an array `[centroids,clusterAssment]`, the `centroids` is the coordinate matrix of all cluster centers and `clusterAssment` is an array `[centroidsIndex,minDist**2]`, `centroidsIndex` is the the index of the center to which the point belongs and `minDist` is the The distance between the point and its center.
