// @ts-check
const Matrix = require('../../utils/matrix/index');
const Vector = require('../../utils/vector/index');
const fs = require('fs');
const {Repeat,List} = require('immutable');

// 计算香农熵
function calShannoEnt(dataSet){
    let numEntries = dataSet.length;
    let labelCounts = {};

    dataSet.forEach(v=>{
        let label = v[v.length-1];
        if(label in labelCounts){
            return labelCounts[label] += 1;
        }
        
        labelCounts[label] = 1;
    });
    let shannoEnt = 0.0;
    for(let label in labelCounts){
        let prob = labelCounts[label]/numEntries;
        shannoEnt -= prob * Math.log2(prob);
        
    }
    return shannoEnt;
}

/**
 * 划分数据集
 * 
 * @param {array} dataSet 原始数据集 
 * @param {number} axis 划分特征
 * @param {any} value 特征值 
 * @returns {array} 划分后的数据集
 */
function splitDataSet(dataSet,axis,value){
    let retDataSet = dataSet.reduce((pre,cur)=>{
        let curList = List(cur);
        if(cur[axis] === value){
            pre.push(curList.splice(axis,1).toArray());
        }
        return pre;
    },[]);
    return retDataSet;    
}

// 选择最好的划分特征
function chooseBestLabelToSplit(dataSet){
    let numLables = dataSet[0].length - 1,
        baseEntropy = calShannoEnt(dataSet),
        bestInfoGain = 0.0,
        bestLabel = -1;
    
    for(let i=0; i<numLables; i++){
        let featList = dataSet.map(v=>v[i]),
            uniqueVals = [...new Set(featList)],
            newEntropy = 0.0;
        uniqueVals.forEach((v,index)=>{
            let subDataSet = splitDataSet(dataSet,i,v),
                prob = subDataSet.length/dataSet.length;
            newEntropy += prob * calShannoEnt(subDataSet);
        });
        let infoGain = baseEntropy - newEntropy;
        
        if(infoGain > bestInfoGain){
            bestInfoGain = infoGain;
            bestLabel = i;
        }
    }
    
    return bestLabel;
}

// 多数决策，当子数据集只有一个特征，且各个实例所属分类仍旧不同时调用此方法
function majorityCnt(classList){
    let classCount = {};
    classList.forEach((v,i)=>{
        if(v in classCount){
            return classCount[v] += 1;
        }
        classCount[v] = 1;
    })
    let sortedClassCount = Object.keys(classCount).sort((a,b)=>classCount[b]-classCount[a]);

    return sortedClassCount[0];
}

// 构建决策树
function createTree(dataSet,labels){
    let classList = dataSet.map(v=>v[v.length-1]),
        uniqueClasses = [...new Set(classList)].length;
    if(uniqueClasses === 1){
        return classList[0];
    }
    if(dataSet[0].length === 1){
        return majorityCnt(classList);
    }
    let bestFeat = chooseBestLabelToSplit(dataSet),
        bestFeatLabel = labels[bestFeat];
    let resultTree = {
        [bestFeatLabel]: {}
    }
    labels.splice(bestFeat,1);
    let featValues = dataSet.map(v=>v[bestFeat]),
        uniqueVals = [...new Set(featValues)];
    uniqueVals.forEach(v=>{
        let subLabels = [...labels],
            subDataSet = splitDataSet(dataSet,bestFeat,v);
        resultTree[bestFeatLabel][v] = createTree(subDataSet,subLabels);
    })

    return resultTree;
}

/**
 * 判断测试数据分类
 * 
 * @param {object} inputTree 决策树对象
 * @param {array} featLabels 特征名称向量
 * @param {array} testVec 测试向量
 * @returns 测试数据的分类
 */
function classify(inputTree,featLabels,testVec){
    let firstStr = Object.keys(inputTree)[0],
        secondDict = inputTree[firstStr],
        featIndex = featLabels.indexOf(firstStr);
        
    let resultClass;
    for(let key of Object.keys(secondDict)){
        
        if(testVec[featIndex] === key){
            if(typeof secondDict[key] === 'object'){
                resultClass = classify(secondDict[key],featLabels,testVec);
            } else{
                resultClass = secondDict[key];
                break;
            }
        }
    }
    return resultClass;
}

class DT {
    constructor(dataSet,labels,alg="ID3"){
        this.dataSet = dataSet;
        this.labels = labels;
        this.tree = createTree(dataSet,[...labels]);
    }
    getTree(){
        return this.tree;
    }
    // 根据实例构造的决策树进行测试
    classify(featLabels,testVec){
        return classify(this.tree,featLabels,testVec);
    }
    // 将决策树存入文件
    storeTree(filePath){
        let jsonTree = JSON.stringify(this.tree);
        return new Promise((resolve,reject)=>{
            fs.writeFile(filePath,jsonTree,err=>{
                if(err){
                    return reject(err);
                }
                resolve();
            });
        })
    }
    // 根据提供的决策树进行测试，静态方法，无需实例化构造决策树
    static classifyFromTree(inputTree,featLabels,testVec){
        return classify(inputTree,featLabels,testVec);
    }
}

module.exports = DT;