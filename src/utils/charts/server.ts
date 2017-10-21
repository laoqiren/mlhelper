import * as express from 'express';
import * as c from 'child_process';


export default function(html){
    const app = express();
    app.use('/',(req,res,next)=>{
        res.set('Content-Type', 'text/html');
        res.status(200).send(html);
    })
    app.listen(4000,()=>{
        console.log('the server has been listened at port 4000')
    })

    let cmd = '';

    switch (process.platform) {
        case 'wind32':
            cmd = 'start';
            break;

        case 'linux':
            cmd = 'xdg-open';
            break;

        case 'darwin':
            cmd = 'open';
            break;
    }
    c.exec(`${cmd} http://localhost:4000`); 
}