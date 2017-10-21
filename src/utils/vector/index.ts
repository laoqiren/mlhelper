import {List,Repeat} from 'immutable';

class Vector {
    constructor(public arr: ReadonlyArray<number>){
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
}

export default Vector;