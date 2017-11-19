import Matrix from '../../utils/matrix/index';
import Vector from '../../utils/vector/index';
import * as _ from 'lodash';

class AdaBoost {
    private dataSet: Array<Array<number>>;
    private labels: Array<number>;
    private numInt: number;

    constructor(dataSet: Array<Array<number>>,labels: Array<number>,numInt=40 as number){
        this.dataSet = dataSet;
        this.labels = labels;
        this.numInt = numInt;
    }
    // 基于单层决策树的弱分类器
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
    buildStump(D: Array<number>): [Object,number,Array<number>]{
        let dataSetMat = new Matrix(this.dataSet);
        let labels = this.labels;
        let [m,n] = dataSetMat.size();
        let numSteps = 10.0,
            bestStump = {},  //用于存放最佳单层决策树
            bestClassEst = Matrix.ones(m), // 该弱分类器最低错误率时的预测分类向量
            minError = Infinity; // 初始最新错误率为无穷大
        let that = this;

        for(let i=0; i<n; i++){
            let rangeMin = dataSetMat.min()[i],
                rangeMax = dataSetMat.max()[i];
            let stepSize = (rangeMax-rangeMin)/numSteps;

            for(let j=0; j<numSteps; j++){
                for(let flag of ['lt','gt']){
                    let threshVal = rangeMin + j * stepSize;
                    let predictedVals = that.stumpClassify(dataSetMat,i,threshVal,flag); //弱分类器分类结果

                    let errArr = Matrix.ones(m);
                    errArr = errArr.map((v,i)=>predictedVals[i]===labels[i]?0:1);

                    let weightedError = _.sum(_.zipWith(errArr,D,(a,b)=>a*b)); // 各个特征的错误加权和

                    if(weightedError<minError){ //得到当前特征权值向量下的最佳弱分类器
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
    adaBoostTrainDS(): Array<Object>{
        let numInt = this.numInt, // 最大迭代次数
            dataMatrix = new Matrix(this.dataSet),
            labels = this.labels,
            weakClassArr = []; //弱分类器数组
        let m = dataMatrix.size()[0],
            D = Matrix.ones(m).map(v=>v/m);  //初始的特征权值向量

        let aggClassEst = <Array<number>> Matrix.zeros(m).arr;

        for(let i=0; i<numInt; i++){
            let [bestStump,error,classEst] = this.buildStump(D);
            let alpha = 0.5*Math.log((1.0-error)/Math.max(error,1e-16)); // 计算当前弱分类器的权重

            bestStump['alpha'] = alpha;
            weakClassArr.push(bestStump);

            // 重新计算特征权值向量
            let expon = _.zipWith(labels,classEst,(a,b)=>a*b).map(v=>-1*alpha*v);
            D = _.zipWith(D,expon,(a,b)=>a*Math.exp(b));
            let Dsum = _.sum(D);
            D = D.map(v=>v/Dsum);

            // 计算已有弱分类器组合后的错误率
            let alphaClassEst = classEst.map(v=>v*alpha);
            aggClassEst = _.zipWith(alphaClassEst,aggClassEst,(a,b)=>a+b);
            let realAggClassEst = <Array<number>> Vector.sign(aggClassEst);
            let aggErrors = _.zipWith(_.zipWith(realAggClassEst,labels,(a,b)=>a===b?0:1),Matrix.ones(m),(a,b)=>a*b);
            let errorRate = _.sum(aggErrors)/m;

            if(errorRate === 0.0) {
                break;
            }
        }
        return weakClassArr;
    }
    classify(inx: Array<Array<number>>): Array<number>{
        let dataMatrix = new Matrix(inx);
        let m = dataMatrix.size()[0];
        let aggClassEst = <Array<number>> Matrix.zeros(m).arr;

        // 组合所有弱分类器
        let classifierArr = this.adaBoostTrainDS();
        classifierArr.forEach((v,i)=>{
            let classEst = this.stumpClassify(dataMatrix,v['dim'],v['thresh'],v['ineq']);
            aggClassEst = _.zipWith(classEst.map(value=>value*v['alpha']),aggClassEst,(a,b)=>a+b);
        });

        return <Array<number>> Vector.sign(aggClassEst);
    }
}

export default AdaBoost;