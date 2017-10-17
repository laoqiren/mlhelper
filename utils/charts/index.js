const server = require('./server')
const path = require('path');
const fs = require('fs');
const swig = require('swig');

function renderFile(template,data){
    return swig.render(fs.readFileSync(template).toString(),{
        filename: template,
        autoescape: false,
        locals: data
    });
}

function drawkNN(dataSet_,labels_,inx,{
    width="600px",
    height="400px",
    size=20
}={}){
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
        title: 'kNN图',
        width,
        height,
        size,
        data: JSON.stringify(data),
        classes: JSON.stringify(classes.map(v=>v.toString()))
    });
    server(html)
}

exports.drawkNN = drawkNN;