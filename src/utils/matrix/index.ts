import {List,Repeat} from 'immutable';
import * as math from 'mathjs';
import * as _ from 'lodash';

class Matrix {
    constructor(public arr: Array<Array<number>>){}
    
    /**
     * 获取原始多维数组 Get raw data.
     * 
     * @returns {Array<Array<number>>} 
     * @memberof Matrix
     */
    toArray(): Array<Array<number>>{
        return this.arr;
    }
    /**
     * 针对两个矩阵同一行同一列的值对应进行计算 Matrix operation. like '*','/','+','-'.
     * 
     * @param {Class Matrix} arrA Matrix A
     * @param {Class Matrix} arrB Matrix B
     * @param {String} operator  operation，'+'|'-'|'*'|'\'
     * @returns {Class Matrix} result.
     * @memberof Matrix
     */
    zipWith(arrA: Array<Array<number>>,arrB: Array<Array<number>>,operator: string): Matrix{
        let result = [];

        switch(operator){
            case '+':
                result = _.zipWith(arrA,arrB,(a,b)=>{
                    return _.zipWith(a,b,(m,n)=>m+n);
                });
                break;
            case '-':
                result = _.zipWith(arrA,arrB,(a,b)=>{
                    return _.zipWith(a,b,(m,n)=>m-n);
                });
                break;
            case '*':
                result = _.zipWith(arrA,arrB,(a,b)=>{
                    return _.zipWith(a,b,(m,n)=>m*n);
                });
                break;
            case '/':
                result = _.zipWith(arrA,arrB,(a,b)=>{
                    return _.zipWith(a,b,(m,n)=>m/n);
                });
                break;
            default:
                return;

        }
        return new Matrix(result);
    }
    /**
     * Matrix subtraction
     * 
     * @param {Matrix} toSub Matrix to sub with.
     * @returns {Matrix} 
     * @memberof Matrix
     */
    sub(toSub: Matrix): Matrix{
        return this.zipWith(this.arr,toSub.arr,'-');
    }
    /**
     * matrix addition
     * 
     * @param {Matrix} toAdd Matrix to add with.
     * @returns {Matrix} 
     * @memberof Matrix
     */
    add(toAdd: Matrix): Matrix{
        return this.zipWith(this.arr,toAdd.arr,'+')
    }
    /**
     * matrix multiplication
     * 
     * @param {Matrix} toMult matrix to multiply with.
     * @returns {Matrix} 
     * @memberof Matrix
     */
    mult(toMult: Matrix): Matrix{
        return this.zipWith(this.arr,toMult.arr,'*')
    }
    /**
     * Matrix Division
     * 
     * @param {Matrix} toDivide matrix to divide with.
     * @returns {Matrix} 
     * @memberof Matrix
     */
    divide(toDivide: Matrix): Matrix{
        return this.zipWith(this.arr,toDivide.arr,'/');
    }
    /**
     * Get the size of Matrix, including rows and columns.
     * 
     * @returns {[number,number]} 
     * @memberof Matrix
     */
    size(): [number,number]{
        return [this.arr.length,this.arr[0].length];
    }
    /**
     * 矩阵同一行/列进行相加 The sum of data in the same row/column
     * 
     * @param {number} [axis=1] when to be 1, get the sum of the same row, when to be 0, get the sum of the same column. default to 1.
     * @returns {Array}
     * @memberof Matrix
     */
    sum(axis=1 as number): Array<number>{
        if(axis === 0){
            return this.transpose().map(v=>_.sum(v));
        }
        return this.arr.map(v=>_.sum(v));
    }
    /**
     * 
     * 获取同一行/列的最小值 The minimum value of data in the same row/column.
     * @param {number} [axis=0 as number] when set to be 0, get the minimum value of data in the same column. 1 to the same row. default is 0.
     * @returns {Array<number>} 
     * @memberof Matrix
     */
    min(axis=0 as number): Array<number>{
        let arr = axis === 0?this.transpose():[...this.arr];

        arr = arr.map(v=>v.filter(c=>typeof c === 'number'));

        return arr.map(v=>_.min(v));
    }
    /**
     * 获取同一行/列的最大值 The maximum value of data in the same row/column.
     * 
     * @param {number} [axis=0 as number] when set to be 0, get the maximum value of data in the same column. 1 to the same row. default is 0.
     * @returns {Array<number>} 
     * @memberof Matrix
     */
    max(axis=0 as number): Array<number>{
        let arr = axis === 0?this.transpose():[...this.arr];
        
        arr = arr.map(v=>v.filter(c=>typeof c === 'number'));

        return arr.map(v=>_.max(v));
    }
    /**
     * 转置矩阵 Transpose matrix
     * 
     * @returns {Array<Array<number>>} 
     * @memberof Matrix
     */
    transpose(): Array<Array<number>>{
        return math.transpose(this.arr);
    }
    calAvg(flag=0 as number): Array<number>{
        let arr = flag === 0 ? this.transpose():this.arr;
        return arr.map((v,i)=>{
            let sum = v.reduce((pre,cur)=>pre+cur,0);
            return sum/v.length;
        });
    }
    // 初始化零矩阵
    static zeros(r: number,c?: number): Array<Array<number>>|Array<number>{
        return c?math.zeros(r,c)._data:math.zeros(r)._data;
    }
    static ones(m: number,n?: number): Array<Array<number>>|Array<number>{
        return n?math.ones(m,n)._data:math.ones(m)._data;
    }
    /**
     * 获取同一行或同一列的平均值 The average value of the same row/column of data
     * 
     * @static
     * @param {Array<Array<number>>} arr 
     * @param {number} [axis=0 as number] when to be 0, the same column, 1 to the same row. default to 0.
     * @returns {Array<number>} 
     * @memberof Matrix
     */
    static mean(arr: Array<Array<number>>, axis=0 as number): Array<number>{
        
        if(axis === 0){ //按列求平均值
            return math.transpose(arr).map(v=>_.sum(v)/v.length);
        } else {
            return arr.map(v=>_.sum(v)/v.length);
        }
    }
}

export default Matrix;