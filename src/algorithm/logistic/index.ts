import Matrix from '../../utils/matrix';
import * as _ from 'lodash';

function sigmoid(inx){
    return 1.0/(1+Math.exp(-inx));
}
class Logistic {
    private dataMatrix: Matrix;
    private labels: Array<number>;
    private numIter: number;

    constructor(dataMatIn_: Array<Array<number>>,classLabels: Array<number>,numIter: number){
        let dataMatIn = [...dataMatIn_];
        dataMatIn = dataMatIn.map(v=>[1.0,v[0],v[1]]);

        this.dataMatrix = new Matrix(dataMatIn);
        this.labels = classLabels;
        this.numIter = numIter;
    }
    // 随机梯度上升法求各个特征的最佳回归系数
    getWeights(): Array<number>{
        let dataMatrix = this.dataMatrix.arr;
        let labels = this.labels;

        let [m,n] = this.dataMatrix.size();
        let weights = Matrix.ones(n);  // 初始化每个特征的系数
        let indexArr;
        let alpha;  // 梯度上升步长

        for(let i=0; i<this.numIter; i++){
            indexArr = _.range(m);
            for(let j=0; j<m; j++){
                
                alpha = 4/(1.0+j+i) + 0.0001; // alpha不断减小，但保留一个常数，使其不会为0
                let randomIndex = _.random(0,indexArr.length-1);
                let vec = _.zipWith(dataMatrix[randomIndex],weights,(a,b)=>a*b);
                
                let h = sigmoid(_.sum(vec));
                let error = labels[randomIndex] - h;
                let rised = dataMatrix[randomIndex].map(v=>v*alpha*error);
                
                weights = _.zipWith(weights,rised,(a,b)=>a+b);
                indexArr.splice(randomIndex,1);
            }
        }

        return weights;
    }

    classify(inX_: Array<number>): number{
        let inX = [...inX_];
        inX = [1.0,inX[0],inX[1]];

        let weights = this.getWeights();
        let vec = _.zipWith(inX,weights,(a,b)=>a*b);
        let prob = sigmoid(_.sum(vec));
        
        return prob>0.5?1.0:0.0;
    }
}

export default Logistic;