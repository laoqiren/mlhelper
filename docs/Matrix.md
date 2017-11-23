# Matrix utils

## constructor(arr: Array<Array\<number>>)
*arr:* The Original 2D array data.

## toArray(): Array<Array\<number>>
Get the original array.

## size(): [number,number]
Get the size of Matrix, including rows and columns.

## sum(axis=1 as number): Array<number>
The sum of data in the same row/column

*axis:* If axis is set to 1, the sum of all the data of the same row is calculated, otherwise the column is computed. Default to 1.

## min(axis=0 as number): Array\<number>
The minimum value of data in the same row/column.

*axis:* If axis is set to 1, the minimum value of all data in the same row is calculated, otherwise the column is computed. default to 0.

## max(axis=0 as number): Array\<number>
The maximum value of data in the same row/column.

*axis:* If axis is set to 1, the maximum value of all data in the same row is calculated, otherwise the column is computed. default to 0.

## static mean(arr: Array<Array\<number>>, axis=0 as number): Array\<number>
The average value of the same row/column of data

*arr:* dataset to calculate.
*axis:* If axis is set to 1, the average value of all the data in the same row is calculated, otherwise the column is computed

## transpose(): Array<Array\<number>>
Transpose the Matrix.

## static zeros(r: number,c?: number): Array<Array\<number>>|Array\<number>

If there are two parameters, the zero matrix of the specified size is returned. If there is only one parameter, the one dimensional array is returned

## static ones(m: number,n?: number): Array<Array\<number>>|Array\<number>

Be similar with `zeros()`.
## sub(toSub: Matrix): Matrix
Matrix subtraction.

*toSub:* Matrix to sub with.


## add(toAdd: Matrix): Matrix
Matrix addition.

*toAdd:* Matrix to add with.

## mult(toMult: Matrix): Matrix
Matrix multiplication.

*toMult:* Matrix to multiply with.

## divide(toDivide: Matrix): Matrix
Matrix Division.

*toDivide:* Matrix to divide with.


```js
const dataSet = [
    [2,4,6],
    [5,7,1],
    [3,3,1]
];
const dataSet2 = [
    [1,3,5],
    [2,4,7],
    [3,5,8]
];

let result = matA.add(matB);
expect(result.toArray()).to.eql([
    [3,7,11],
    [7,11,8],
    [6,8,9]
]);  // true;
let matA = new Matrix(dataSet),
    matB = new Matrix(dataSet2);

expect(matA.max(1)).to.eql([6,7,3]);  //true
expect(matA.max(0)).to.eql([5,7,6]);  //true

expect(matA.transpose()).to.eql([[2,5,3],[4,7,3],[6,1,1]]);  //true

expect(Matrix.ones(2,2)).to.eql([[1,1],[1,1]]); //true
expect(Matrix.ones(2,2)).to.eql([[1,1],[1,1]]); //true
```