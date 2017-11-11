import Logistic from './index';
import * as Parser from '../../utils/fileParser/index';
import * as preprocessing from '../../utils/features/preprocessing';
import * as path from 'path';
import { log, print } from 'util';
import * as charts from '../../utils/charts/index';

let datas = Parser.read_csv(path.join(__dirname,'../../../assets/testSet.txt'),{
    index_col:false,
    delimiter: ',',
    header: false,
    classType:'string'
});

let dataSet = datas.drop(4).values;

let labels = datas.getClasses();

labels = labels.map(v=>{
    return v==='Iris-setosa'?1:0;
});

let logi = new Logistic(dataSet,labels,150);

let errors = 0;
for(let i=0; i<dataSet.length; i++){
    let r = logi.classify(dataSet[i]);
    if(labels[i]!==r){
        errors+=1;
    }
}

console.log('error rate:',errors/dataSet.length)

let weights = logi.getWeights()
console.log(weights);

charts.drawLogistic(dataSet,labels,weights)

