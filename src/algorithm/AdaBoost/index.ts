
class AdaBoost {
    private dataSet: Array<Array<number>>;
    private labels: Array<number>;
    private numInt: number;

    constructor(dataSet: Array<Array<number>>,labels: Array<number>,numInt:number){
        this.dataSet = dataSet;
        this.labels = labels;
        this.numInt = numInt;
    }

    buildStump(){
        //todo
    }
    adaBoostTrainDS(){
        //todo
    }
    adaClassify(inx: Array<number>){
        //todo
    }
}

export default AdaBoost;