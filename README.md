# mlhelper
[![npm](https://img.shields.io/npm/v/mlhelper.svg?style=flat-square)](https://github.com/laoqiren/mlhelper)
[![npm](https://img.shields.io/npm/l/mlhelper.svg?style=flat-square)](https://github.com/laoqiren/mlhelper)

Algorithms and utils for Machine Learning in JavaScript based on Node.js. while implementing commonly used machine learning algorithms, This library attempts to provide more abundant ecology, such as matrix and vector operations, file parsing, feature engineering, data visualization, and so on.

*`QQ Group`: 485305514*
## Installation
```
$ npm install mlhelper
```

## Documention

* [algorithm](docs/algorithm.md)
* [Matrix](docs/Matrix.md)
* [Vector](docs/Vector.md)
* [file Parser](docs/fileParser.md)
* [graph tools](docs/graph.md)
* [feature Engineering](docs/features.md)

## Example

### Algorithm

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
console.log(result); // [ 1, 1, -1, -1, -1 ]
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
<img src="http://7xsi10.com1.z0.glb.clouddn.com/logistic2.png" width="550px"/>


## Contribute

The original purpose of this project is to learn, and now I need more people to participate in this project, and any issue and good advice is welcome.
### git clone 
```
git clone https://github.com/laoqiren/mlhelper.git
```
### install dependencies&&devdependecies
```
npm install
```

### development
```
npm run dev
```

### test
```
npm run test
```

### build
```
npm run build
```
## LICENSE
MIT.

*You can use the project for any purpose, except for illegal activities.*
