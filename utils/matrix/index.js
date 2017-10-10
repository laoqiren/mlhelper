const {List,Repeat} = require('immutable');
const math = require('mathjs');

class Matrix {
    constructor(arr){
        this.arr = arr;
    }
    toArray(){
        return this.arr;
    }
    zipWith(arrA,arrB,operator){
        let result = [];
        switch(operator){
            case '+':
                for(let i=0; i<arrA.length; i++){
                    result[i] = [];
                    for(let j=0; j<arrA[0].length; j++){
                        result[i].push(arrA[i][j] + arrB[i][j]);
                    }
                }
                break;
            case '-':
                for(let i=0; i<arrA.length; i++){
                    result[i] = [];
                    for(let j=0; j<arrA[0].length; j++){
                        result[i].push(arrA[i][j] - arrB[i][j]);
                    }
                }
                break;
            case '*':
                for(let i=0; i<arrA.length; i++){
                    result[i] = [];
                    for(let j=0; j<arrA[0].length; j++){
                        result[i].push(arrA[i][j] * arrB[i][j]);
                    }
                }
                break;
            case '/':
                for(let i=0; i<arrA.length; i++){
                    result[i] = [];
                    for(let j=0; j<arrA[0].length; j++){
                        result[i].push(arrA[i][j] / arrB[i][j]);
                    }
                }
                break;
            default:
                return;

        }
        return new Matrix(result);
    }
    sub(toSub){
        return this.zipWith(this.arr,toSub.arr,'-');
    }
    add(toAdd){
        return this.zipWith(this.arr,toAdd.arr,'+')
    }
    mult(toMult){
        return this.zipWith(this.arr,toMult.arr,'*')
    }
    divide(toDivide){
        return this.zipWith(this.arr,toDivide.arr,'/');
    }
    size(){
        return [this.arr.length,this.arr[0].length];
    }
    sum(axis=1){
        let result = [];
        for(let row of this.arr){
            let rowSum = row.reduce((pre,cur)=>pre+cur);
            result.push(rowSum);
        }
        return result;
    }
    min(){
        let cols = this.arr[0].length;
        let result = [];
        for(let i=0; i<cols; i++){
            let col = this.arr.map(v=>v[i]);
            let colMin = Math.min(...col);
            result.push(colMin);
        }
        return result;
    }
    max(){
        let cols = this.arr[0].length;
        let result = [];
        for(let i=0; i<cols; i++){
            let col = this.arr.map(v=>v[i]);
            let colMax = Math.max(...col);
            result.push(colMax);
        }
        return result;
    }
    static zeros(r,c=2){
        return new Matrix(math.zeros(r,c)._data);
    }
}

module.exports = Matrix;