import server from './server';
import * as path from 'path';
import * as fs from 'fs';
import * as swig from 'swig';

export function renderFile(template: string,data: object){
    return swig.render(fs.readFileSync(template).toString(),{
        filename: template,
        autoescape: false,
        locals: data
    });
}

interface KnnConfig {
    width: string;
    height: string;
    size: number;
}

export function drawkNN(dataSet_: Array<Array<any>>,labels_: Array<number>,inx: Array<number>,{
    width="600px",
    height="400px",
    size=20
}={} as KnnConfig){
    let dataSet = [...dataSet_];
    let labels = [...labels_];
    let data = [];
    let classes = [...new Set(labels)].filter(v=>v!==undefined);
    classes.forEach(c=>{
        let classSet = dataSet.filter((value,i)=>labels[i] === c);
        data.push([...classSet])
    });

    classes.push('test');
    data.push([inx]);
    let html = renderFile(path.resolve(__dirname,'kNN','tpl.html'),{
        title: "Scatter plot for kNN",
        width,
        height,
        size,
        data: JSON.stringify(data),
        classes: JSON.stringify(classes.map(v=>v.toString()))
    });
    server(html)
}
