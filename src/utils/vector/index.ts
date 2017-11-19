import {List,Repeat} from 'immutable';

class Vector {
    constructor(public arr: Array<number>){
    }
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
    static sign(arr: number|Array<number>): number|Array<number>{
        if(Array.isArray(arr)){
            return arr.map(v=>v===0.0?0.0:(v>0.0?1.0:-1.0))
        } else {
            return arr===0.0?0.0:(arr>0.0?1.0:-1.0);
        }
    }
}

export default Vector;