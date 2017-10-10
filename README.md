# mlhelper
Algorithms and utils for Machine Learning in JavaScript.

## Example

**Install**
```
$ npm install mlhelper
```

**Algorithm**

kNN: 
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

**Utils**

Matrix:
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

Vector:
```js
const Vector = require('mlhelper').utils.Vector;

let v = new Vector([5,10,7,1]);
console.log(v.argSort()) // [ 3, 0, 2, 1 ]
```

## Docs
A variety of algorithms and tools are still constantly improved, complete API documents, please look forward to
## LICENSE
MIT.

