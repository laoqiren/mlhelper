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

let dt = parser.read_csv(path.join(__dirname,'./train.csv'),0,',',0);
let labels = dt.getClasses();
let dataSet =dt.drop('quality').values;
```

**graph tools:**
```js
const charts = require('mlhelper').utils.charts;
let knn = new kNN(dataSet,labels);
let inx = [7.0,0.27,0.36,20.7,0.045,45.0,170.0,1.001,3.0,0.45,8.8],
    normalInx = knn.autoNormalVector(inx);

console.log(knn.classify(inx,100)); // 6
charts.drawkNN(kNN.autoNormal(dataSet),labels,normalInx,"400px","300px",15);
```
This will open your browser and draw dispersive points for kNN:

![http://7xsi10.com1.z0.glb.clouddn.com/kNN.png](http://7xsi10.com1.z0.glb.clouddn.com/kNN.png)


## Docs
A variety of algorithms and tools are still constantly improved, complete API documents, please look forward to
## LICENSE
MIT.

