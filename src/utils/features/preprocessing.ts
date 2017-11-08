import Matrix from '../matrix/index';
import Vector from '../vector/index';
import {Repeat,List} from 'immutable';

// 标准化数据集，针对每列（每个特征），将特征转化为服从正态分布
export function standardScaler(dataSet: Array<Array<number>>): Array<Array<number>>{
    let mdataset = new Matrix(dataSet);
    let transSet = mdataset.transpose();

    let setAvgs = mdataset.calAvg(0);
    let result = transSet.map((v,i)=>{
        let vlength = v.length;
        return v.map(col=>{
            return Math.pow((col-setAvgs[i]),2)/vlength;
        });
    });

    return new Matrix(result).transpose();
}

// 归一化数据集，采用区间缩放法，将特征值缩放到（0，1）
export function normalize(dataSet_: Array<Array<number>>): Array<Array<number>>{
    let dataSet = new Matrix(dataSet_);
    let minVals = dataSet.min(0); // 每个特征的最小值
    let maxVals = dataSet.max(0); // 每个特征的最大值
    let ranges = new Vector(maxVals).zipWith((a,b)=>a-b,new Vector(minVals)); // 每个特征的范围
    
    let normalDataSet = Matrix.zeros(...dataSet.size());
    let setSize = dataSet.size()[0]; // 训练集实例数
    
    normalDataSet = dataSet.sub(new Matrix(Repeat(minVals,setSize).toArray())); //分子为每个特征原始值减去该特征最小值

    normalDataSet = normalDataSet.divide(new Matrix(Repeat(ranges,setSize).toArray())); // 上式得到的每个特征值除以该特征范围
    return normalDataSet.arr;
}

// 二值化特征，第二个参数指定每个特征的阀值，相应特征大于指定阀值取1，否则取0
export function binarizer(dataSet: Array<Array<number>>,threshold: Array<number>): Array<Array<number>>{
    let mdataset = new Matrix(dataSet);
    let transSet = mdataset.transpose();

    let result = transSet.map((v,i)=>{
        return v.map(c=>c>threshold[i]?1:0);
    });

    return result;
}

// 哑编码特征值，当特征值为非数值时，将各个值作为新的特征
export function oneHotEncoder(dataSet: Array<Array<number>>): Array<Array<number>>{

}