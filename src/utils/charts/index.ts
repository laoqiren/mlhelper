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

function treeLeaf(obj,leafRule){
    let objKey = Object.keys(obj)[0];
    let leaf = obj[objKey];
    let children = [];
    let rules = Object.keys(leaf);
    for(let rule of rules){
        if(typeof leaf[rule] === 'object'){
            children.push(treeLeaf(leaf[rule],rule));
            continue;
        }
        children.push({
            name: leaf[rule],
            rule
        });
    }

    return {
        name: objKey,
        rule: leafRule,
        children: [...children]
    }
}

export function drawDT(tree: object,{
    width=600,
    height=400
}){
    let firstStr = Object.keys(tree)[0];
    let obj = treeLeaf(tree,null);
    let html = renderFile(path.resolve(__dirname,'DT','tpl.html'),{
        width,
        height,
        data: JSON.stringify(obj)
    })
    server(html);
}

export function drawkNN(dataSet_: Array<Array<number>>,labels_: Array<any>,inx: Array<number>,{
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


export function drawLogistic(dataSet_: Array<Array<number>>,labels_: Array<any>,weights: Array<number>,{
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

    let xs = dataSet.map(v=>v[0]),
        minx = Math.min(...xs),
        maxx = Math.max(...xs);

    let k = -weights[1]/weights[2];
    let b = -weights[0]/weights[2];

    let linePoints = [
        [minx,k*minx+b],
        [maxx,k*maxx+b]
    ]

    let html = renderFile(path.resolve(__dirname,'logistic','tpl.html'),{
        title: "Logistic Regression",
        width,
        height,
        size,
        data: JSON.stringify(data),
        classes: JSON.stringify(classes.map(v=>v.toString())),
        linePoints: JSON.stringify(linePoints)
    });
    server(html)
}