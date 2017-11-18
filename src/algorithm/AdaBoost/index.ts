import Matrix from '../../utils/matrix/index';
import * as _ from 'lodash';

class AdaBoost {
    private dataSet: Array<Array<number>>;
    private labels: Array<number>;
    private numInt: number;

    constructor(dataSet: Array<Array<number>>,labels: Array<number>,numInt:number){
        this.dataSet = dataSet;
        this.labels = labels;
        this.numInt = numInt;
    }
    stumpClassify(dataMatrix: Matrix,dimen: number,threshVal: number,flag: String): Array<number>{
        let m = dataMatrix.size()[0];
        let retArray = Matrix.ones(m);

        if(flag === 'lt'){
            retArray = retArray.map((v,i)=>dataMatrix.arr[i][dimen]<=threshVal?-1.0:1.0);
        } else {
            retArray = retArray.map((v,i)=>dataMatrix.arr[i][dimen]>threshVal?-1.0:1.0);
        }
        return retArray;
    }
    buildStump(D: Array<number>){
        let dataSetMat = new Matrix(this.dataSet);
        let labels = this.labels;
        let [m,n] = dataSetMat.size();
        let numSteps = 10.0,
            bestStump = {},
            bestClassEst = Matrix.ones(m),
            minError = Infinity;
        let that = this;

        for(let i=0; i<n; i++){
            let rangeMin = dataSetMat.min()[i],
                rangeMax = dataSetMat.max()[i];
            let stepSize = (rangeMax-rangeMin)/numSteps;

            for(let j=0; j<numSteps; j++){
                for(let flag of ['lt','gt']){
                    let threshVal = rangeMin + j * stepSize;
                    let predictedVals = that.stumpClassify(dataSetMat,i,threshVal,flag);

                    let errArr = Matrix.ones(m);
                    errArr = errArr.map((v,i)=>predictedVals[i]===labels[i]?0:1);

                    let weightedError = _.sum(_.zipWith(errArr,D,(a,b)=>a*b));

                    if(weightedError<minError){
                        minError = weightedError;
                        bestClassEst = [...predictedVals];
                        bestStump = {
                            dim: i,
                            thresh: threshVal,
                            ineq: flag
                        }
                    }
                }
            }
        }

        return [bestStump,minError,bestClassEst];

    }
    adaBoostTrainDS(){
        //todo
    }
    adaClassify(inx: Array<number>){
        //todo
    }
}

export default AdaBoost;