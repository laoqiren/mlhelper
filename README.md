# mlhelper
[![npm](https://img.shields.io/npm/v/mlhelper.svg?style=flat-square)](https://github.com/laoqiren/mlhelper)
[![npm](https://img.shields.io/npm/l/mlhelper.svg?style=flat-square)](https://github.com/laoqiren/mlhelper)

Algorithms and utils for Machine Learning in JavaScript.

## Example

### Install
```
$ npm install mlhelper
```

### Algorithm

**kNN:** 
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

**DT(ID3):**
```js
const mlhelper = require('mlhelper'),
    DT = mlhelper.algorithm.DT,
    parser = mlhelper.utils.fileParser;
const path = require('path');

let dataSet = parser.parseFile(path.join(__dirname,'./dt.txt'));

let labels = ['age','prescript','astigmatic','tearRate']
let dt = new DT(dataSet,labels);

let result = dt.classify(labels,["young","myope","no","reduced"])

console.log(dt.getTree()); // { tearRate: { reduced: 'no lenses', normal: { astigmatic: [Object] } } }
console.log(result); // no lenses
```

**logistic regression**
```js
const logistic = require('mlhelper').algorithm.logistic;
// to get dataSet and labels
let l = new logistic(dataSet,labels,150);
// get test inx data
l.classify(inx);
```

### Utils

**Matrix:**
```js
const Matrix = require('mlhelper').utils.Matrix;

let m1 = new Matrix([
    [1,2,3],
    [3,4,5]
]);

let m2 = new Matrix([
    [2,2,6],
    [3,1,5]
]);

console.log(m2.sub(m1)) // Matrix { arr: [ [ 1, 0, 3 ], [ 0, -3, 0 ] ] }
console.log(m1.mult(m2)) // Matrix { arr: [ [ 2, 4, 18 ], [ 9, 4, 25 ] ] }
```

**Vector:**
```js
const Vector = require('mlhelper').utils.Vector;

let v = new Vector([5,10,7,1]);
console.log(v.argSort()) // [ 3, 0, 2, 1 ]
```

**fileParser:**
```js
const parser = require('mlhelper').utils.fileParser;

let dt = parser.read_csv(path.join(__dirname,'./train.csv'),{
    index_col: 0,
    delimiter: ',',
    header: 0,
    dataType: 'number'
});
let labels = dt.getClasses();
let dataSet =dt.drop('quality').values;
```

**Feature Engineering**
```js
// preprocessing features
const preprocessing = require('mlhelper').utils.features.preprocessing;

// make the features obey the standard normal distribution(Standardization)
let testStandardScaler = preprocessing.standardScaler(dataSet);

let testNormalize = preprocessing.normalize(dataSet);

let testBinarizer = preprocessing.binarizer(dataSet);

// ...
```

**graph tools:**

kNN:
```js
const charts = require('mlhelper').utils.charts;
let knn = new kNN(dataSet,labels);
let inx = [7.0,0.27,0.36,20.7,0.045,45.0,170.0,1.001,3.0,0.45,8.8],
    normalInx = knn.autoNormalVector(inx);

console.log(knn.classify(inx,100)); // 6
charts.drawkNN(kNN.autoNormal(dataSet),labels,normalInx,{
    width: "500px",
    height: "400px",
    size: 15
});
```
This will open your browser and draw dispersive points for kNN:

![http://7xsi10.com1.z0.glb.clouddn.com/knngraph.png](http://7xsi10.com1.z0.glb.clouddn.com/knngraph.png)

Decision Tree:
```js
charts.drawDT(dt.getTree(),{
    width:600,
    height:400
});
```
![http://7xsi10.com1.z0.glb.clouddn.com/DT.png](http://7xsi10.com1.z0.glb.clouddn.com/DT.png)

**logistic regression**
```js
charts.drawLogistic(dataSet,labels,weights);
```
<img src="http://7xsi10.com1.z0.glb.clouddn.com/logistic.png" width="550px"/>

## Docs
A variety of algorithms and tools are still constantly improved, complete API documents, please look forward to
## LICENSE
MIT.

