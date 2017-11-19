import {List,Repeat} from 'immutable';
import * as math from 'mathjs';
import * as _ from 'lodash';

class Matrix {
    constructor(public arr: Array<Array<number>>){}
    
    toArray(): Array<Array<number>>{
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
    zipWith(arrA: Array<Array<number>>,arrB: Array<Array<number>>,operator: string): Matrix{
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
    sub(toSub: Matrix): Matrix{
        return this.zipWith(this.arr,toSub.arr,'-');
    }
    add(toAdd: Matrix): Matrix{
        return this.zipWith(this.arr,toAdd.arr,'+')
    }
    mult(toMult: Matrix): Matrix{
        return this.zipWith(this.arr,toMult.arr,'*')
    }
    divide(toDivide: Matrix): Matrix{
        return this.zipWith(this.arr,toDivide.arr,'/');
    }
    size(): [number,number]{
        return [this.arr.length,this.arr[0].length];
    }
    /**
     * 矩阵同一行进行相加
     * 
     * @param {number} [axis=1] 
     * @returns {Array}
     * @memberof Matrix
     */
    sum(axis?: number): Array<number>{
        let result = [];
        for(let row of this.arr){
            let rowSum = row.reduce((pre,cur)=>pre+cur);
            result.push(rowSum);
        }
        return result;
    }
    // 矩阵每一列的最小值
    min(axis?: number): Array<number>{
        let cols = this.arr[0].length;
        let result = [];
        
        for(let i=0; i<cols; i++){
            let col = this.arr.map(v=>v[i]);
            col = col.filter(v=> typeof v === 'number')
            let colMin = Math.min(...col);
            result.push(colMin);
        }
        return result;
    }
    max(axis?: number): Array<number>{
        let cols = this.arr[0].length;
        let result = [];
        for(let i=0; i<cols; i++){
            let col = this.arr.map(v=>v[i]);
            col = col.filter(v=> typeof v === 'number')
            let colMax = Math.max(...col);
            result.push(colMax);
        }
        return result;
    }
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
    static zeros(r: number,c?: number): Matrix{
        return c?new Matrix(math.zeros(r,c)._data):new Matrix(math.zeros(r)._data);
    }
    static ones(m: number,n?: number){
        return n?math.ones(m,n)._data:math.ones(m)._data;
    }
    static mean(arr: Array<Array<number>>, axis=0 as number): Array<number>{
        
        if(axis === 0){ //按列求平均值
            return math.transpose(arr).map(v=>_.sum(v)/v.length);
        } else {
            return arr.map(v=>_.sum(v)/v.length);
        }
    }
}

export default Matrix;