const {List,Repeat} = require('immutable');

class Vector {
    constructor(arr){
        this.arr = arr;
    }
    argSort(){
        let list = List(this.arr).toArray();
        let result = list
            .map((v,i)=>[v,i])
            .sort(([v1],[v2])=>v1>v2)
            .map(([,i])=>i);
        return result;
    }
    zipWith(func,b){
        let result = this.arr.map((v,i)=>func(v,b.arr[i]))
        return result;
    }
}

module.exports = Vector;