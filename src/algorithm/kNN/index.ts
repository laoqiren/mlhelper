// @ts-check
import Matrix from '../../utils/matrix/index';
import Vector from '../../utils/vector/index';
import {Repeat,List} from 'immutable';

interface ClassCount {
    [index: string]: number;
}
/**
 *  归一化数据
 * 
 * @param {object} Matrix: dataSet
 * @returns {Array} [normalized data,the range of each feature，the minimum value of each feature]
 */
function autoNormal(dataSet: Matrix): [Array<Array<number>>,Array<number>,Array<number>]{
    let minVals = dataSet.min(0); // 每个特征的最小值
    let maxVals = dataSet.max(0); // 每个特征的最大值
    let ranges = new Vector(maxVals).zipWith((a,b)=>a-b,new Vector(minVals)); // 每个特征的范围
    
    let normalDataSet = Matrix.zeros(...dataSet.size());
    let setSize = dataSet.size()[0]; // 训练集实例数
    
    normalDataSet = dataSet.sub(new Matrix(Repeat(minVals,setSize).toArray())); //分子为每个特征原始值减去该特征最小值

    normalDataSet = normalDataSet.divide(new Matrix(Repeat(ranges,setSize).toArray())); // 上式得到的每个特征值除以该特征范围
    return [normalDataSet.arr,ranges,minVals];
}

class kNN {
    private dataSet: Matrix;
    private labels: Vector;
    private ranges: Array<number>;
    private minVals: Array<number>;

    /**
     * Creates an instance of kNN.
     * @param {Array<Array<number>>} dataSet Matrix like datas for training.
     * @param {Array<any>} labels vector like classes of each tarining data.
     * @memberof kNN
     */
    constructor(dataSet: Array<Array<number>>,labels: Array<any>){
        let [normalDataSet,ranges,minVals] = autoNormal(new Matrix(dataSet)); 
        this.dataSet = new Matrix(normalDataSet);
        this.labels = new Vector(labels);
        this.ranges = ranges;
        this.minVals = minVals;
    }
    /**
     * kNN算法主体
     * 
     * @param {array} inx data for testing.
     * @param {number} K值 the K number.
     * @returns {any}
     * @memberof kNN
     */
    classify(inx_: Array<number>,k: number): any{
        const setSize = this.dataSet.size()[0];
        if(k > setSize) {
            k = setSize;
        }

        //归一化测试数据
        let inx = this.autoNormalVector(inx_);
        // 求测试数据与每一个训练数据的距离
        let diffMat = new Matrix(Repeat(inx,setSize).toArray()).sub(this.dataSet); // 建立与训练数据同大小的矩阵，再一一对应相减

        let sqDiffMat = diffMat.mult(diffMat);
        let sqDistances = sqDiffMat.sum(1);
        let distances = sqDistances.map(Math.sqrt);
        let sortedDistanceIndicies = (new Vector(distances)).argSort(); // 与各个训练数据的距离排序的下标

        // 统计每个距离最近前K个值里各个分类的数量
        let classCount:ClassCount = {};
        for(let i=0; i<k; i++){
            let voteIlable = this.labels.arr[sortedDistanceIndicies[i]];
            if(classCount[voteIlable]) {
                classCount[voteIlable] += 1;
            } else {
                classCount[voteIlable] = 1;
            }
        }
        let sortedClassCount = Object.keys(classCount).sort((a,b)=>classCount[b]-classCount[a]);

        // 返回实例最多的分类
        return sortedClassCount[0]
    }
    /**
     * normalize the vector of testing data.
     * 
     * @param {Array<number>} inx_ 
     * @returns {Array<number>} 
     * @memberof kNN
     */
    autoNormalVector(inx_: Array<number>): Array<number>{
        let inx = [...inx_];
        let minVals = this.minVals,
            ranges = this.ranges;
        
        inx = new Vector(inx).zipWith((a,b)=>a - b,new Vector(minVals));
        inx = new Vector(inx).zipWith((a,b)=>a/b,new Vector(ranges));
        return inx;
    }
    /**
     * normalize the given matrix like datas.
     * 
     * @static
     * @param {Array<Array<number>>} dataSet 
     * @returns {Array<Array<number>>} 
     * @memberof kNN
     */
    static autoNormal(dataSet: Array<Array<number>>): Array<Array<number>>{
        return autoNormal(new Matrix(dataSet))[0];
    }
}

export default kNN;