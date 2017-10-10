const {List,Repeat} = require('immutable');
const math = require('mathjs');

class Matrix {
    constructor(arr){
        this.arr = arr;
    }
    toArray(){
        return this.arr;
    }
    /**
     * 针对两个矩阵同一行同一列的值对应进行计算
     * 
     * @param {Class Matrix} arrA 矩阵A
     * @param {Class Matrix} arrB 矩阵B
     * @param {String} operator  操作，'+'|'-'|'*'|'\'
     * @returns {Class Matrix} 计算后的矩阵
     * @memberof Matrix
     */
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
    /**
     * 矩阵同一行进行相加
     * 
     * @param {number} [axis=1] 
     * @returns {Array}
     * @memberof Matrix
     */
    sum(axis=1){
        let result = [];
        for(let row of this.arr){
            let rowSum = row.reduce((pre,cur)=>pre+cur);
            result.push(rowSum);
        }
        return result;
    }
    // 矩阵每一列的最小值
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
    // 初始化零矩阵
    static zeros(r,c=2){
        return new Matrix(math.zeros(r,c)._data);
    }
}

module.exports = Matrix;