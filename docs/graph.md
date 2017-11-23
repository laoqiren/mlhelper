# Graph utils
Provides visual capabilities for various algorithms, which automatically open your browser and draw visual graphics

## drawkNN(dataSet: Array<Array\<number>>,labels: Array<any>,inx: Array<number>,options: object)

Plot the scatter diagram of KNN algorithm
 *dataSet:* matrix of datas for training.

 *labels:* vector of training datas' classes.

 *inx:* vector of data to test.

### options

* options.width: \<string> the width of the graph. default to "600px".
* options.height: \<string> the height of the graph. default to "400px".
* options.size: \<number> the size of every point. default to 20.

```js
const charts = require('mlhelper').utils.charts;
//...
let inx = [7.0,0.27,0.36,20.7,0.045,45.0,170.0,1.001,3.0,0.45,8.8],
    normalInx = knn.autoNormalVector(inx);

console.log(knn.classify(inx,100)); // 6
charts.drawkNN(kNN.autoNormal(dataSet),labels,normalInx,{
    width: "500px",
    height: "400px",
    size: 15
});
```

## drawDT(tree: object,options: object)
Decision tree visualization.
### tree
the decision tree object.

### options
* options.width: \<number> the width of the graph. 
* options.height: \<number> the height of the graph. size: the size of every point.

```js
const charts = require('mlhelper').utils.charts;
// ...
charts.drawDT(dt.getTree(),{
    width:600,
    height:400
});
```

## drawLogistic(dataSet: Array<Array\<number>>,labels: Array\<any>,weights: Array\<number>,options: object)
Visualization of logistic regression algorithm

### dataSet
The matrix like dataset for training.

### labels:
the classes for training dataset.

### weights:
Random gradient ascent method for optimal regression coefficients of each feature

### options:
* options.width: \<string> the width of the graph. default to "600px".
* options.height: \<string> the height of the graph. default to "400px".
* options.size: \<number> the size of every point. deault to 20.

```js
const charts = require('mlhelper').utils.charts;
// ...
let weights = logi.getWeights()
console.log(weights);

charts.drawLogistic(dataSet,labels,weights)
```
