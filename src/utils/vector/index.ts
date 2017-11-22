import {List,Repeat} from 'immutable';
import * as _ from 'lodash';

class Vector {
    constructor(public arr: Array<number>){
    }
    /**
     * 数组元素从小到大排序对应的下标 The sorted index of array.
     * 
     * @returns {number[]} 
     * @memberof Vector
     */
    argSort(): number[]{
        let list = [...this.arr];
        let result = list
            .map((v,i)=>[v,i])
            .sort(([v1],[v2])=>v1>v2)
            .map(([,i])=>i);

        return result;
    }
    zipWith(func: Function,b): Array<number>{
        let result = this.arr.map((v,i)=>func(v,b.arr[i]))
      //  console.log(result)
        return result;
    }
    /**
     * 针对每个元素，若值等于0返回0，若大于0返回1，若小于0返回-1   For each element, when its value equals to 0 returns 0, else if it's larger than 0 returns 1 else returns -1.
     * 
     * @static
     * @param {(number|Array<number>)} arr 
     * @returns {(number|Array<number>)} 
     * @memberof Vector
     */
    static sign(arr: number|Array<number>): number|Array<number>{
        if(Array.isArray(arr)){
            return arr.map(v=>v===0.0?0.0:(v>0.0?1.0:-1.0))
        } else {
            return arr===0.0?0.0:(arr>0.0?1.0:-1.0);
        }
    }
    /**
     * 创建指定个数的0-1之间的随机数  Create specific number of random number between 0 and 1.
     * 
     * @static
     * @param {number} m 
     * @returns 
     * @memberof Vector
     */
    static rand(m: number){
        let initArr = Repeat(0,m).toArray();
        let result = initArr.map(v=>Math.random());
        return result;
    }
}

export default Vector;