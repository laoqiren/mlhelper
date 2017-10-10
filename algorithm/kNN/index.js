const Matrix = require('../../utils/matrix/index');
const Vector = require('../../utils/vector/index');
const {Repeat,List} = require('immutable');

/**
 *  归一化数据
 * 
 * @param {Class Matrix} dataSet 训练数据集
 * @returns {Array} [归一化后的数据,各个特征的范围，各个特征的最小值]
 */
function autoNormal(dataSet){
    let minVals = dataSet.min(0); // 每个特征的最小值
    let maxVals = dataSet.max(0); // 每个特征的最大值
    let ranges = new Vector(maxVals).zipWith((a,b)=>a-b,new Vector(minVals)); // 每个特征的范围
    let normalDataSet = Matrix.zeros(...dataSet.size());
    let setSize = dataSet.size()[0]; // 训练集实例数

    normalDataSet = dataSet.sub(new Matrix(Repeat(minVals,setSize).toArray())); //分子为每个特征原始值减去该特征最小值

    normalDataSet = normalDataSet.divide(new Matrix(Repeat(ranges,setSize).toArray())); // 上式得到的每个特征值除以该特征范围

    return [normalDataSet,ranges,minVals];
}

class kNN {
    constructor(dataSet,labels){
        let [normalDataSet,ranges,minVals] = autoNormal(new Matrix(dataSet)); 
        this.dataSet = normalDataSet;
        this.labels = new Matrix(labels);
        this.ranges = ranges;
        this.minVals = minVals;
    }
    /**
     * kNN算法主体
     * 
     * @param {Array} inx 测试数据
     * @param {any} K值
     * @returns {any}
     * @memberof kNN
     */
    classify(inx,k){
        const setSize = this.dataSet.size()[0];
        if(k > setSize) {
            k = setSize;
        }

        //归一化测试数据
        inx = new Vector(inx).zipWith((a,b)=>a - b,new Vector(this.minVals));
        inx = new Vector(inx).zipWith((a,b)=>a/b,new Vector(this.ranges));

        // 求测试数据与每一个训练数据的距离
        let diffMat = new Matrix(Repeat(inx,setSize).toArray()).sub(this.dataSet); // 建立与训练数据同大小的矩阵，再一一对应相减

        let sqDiffMat = diffMat.mult(diffMat);
        let sqDistances = sqDiffMat.sum(1);
        let distances = sqDistances.map(Math.sqrt);
        let sortedDistanceIndicies = (new Vector(distances)).argSort(); // 与各个训练数据的距离排序的下标

        // 统计每个距离最近前K个值里各个分类的数量
        let classCount = {};
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
}

module.exports = kNN;