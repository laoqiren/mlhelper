import Matrix from '../../utils/matrix';
import Vector from '../../utils/vector';
import * as _ from 'lodash';
import * as util from 'util';

class kMeans {
    private dataSet: Matrix;
    private k: number;

    constructor(dataSet: Array<Array<number>>,k: number){
        this.dataSet = new Matrix(dataSet);
        this.k = k;
    }
    createCent(): Array<Array<number>>{
        let n = this.dataSet.size()[1];
        let centroids = Matrix.zeros(this.k,n).arr;

        for(let j=0; j<n; j++){
            let minJ = this.dataSet.min()[j],
                maxJ = this.dataSet.max()[j],
                rangeJ = maxJ - minJ;
            
            let randomVect = Vector.rand(this.k).map(v=>v*rangeJ+minJ);

            centroids.forEach((v,i)=>{
                v[j] = randomVect[i];
            });
        }

        return centroids;
    }
    // 计算两点欧式距离
    distEclud(vec1: Array<number>,vec2: Array<number>): number{
        return _.sum(_.zipWith(vec1,vec2,(a,b)=>(a-b)**2));
    }
    cluster(): [Array<Array<number>>,Array<Array<number>>]{
        let m = this.dataSet.size()[0],
            dataSet = this.dataSet.arr;
        let clusterAssment = Matrix.zeros(m,2).arr,
            centroids = this.createCent(),
            clusterChanged = true,
            k = this.k;

        while(clusterChanged){
            clusterChanged = false;
            for(let i=0; i<m; i++){
                let minDist = Infinity,
                    minIndex = -1;
                for(let j=0; j<k; j++){
                    let distIJ = this.distEclud(centroids[j],dataSet[i]);
                    if(distIJ < minDist){
                        minDist = distIJ;
                        minIndex = j;
                    }
                }
                if(clusterAssment[i][0]!==minIndex){
                    clusterChanged = true;
                }
                
                clusterAssment[i] = [minIndex,minDist**2];
            }
           
            for(let cent=0; cent<k; cent++){
                let centPointsIndex = [];
                clusterAssment.forEach((v,i)=>{
                    if(v[0]===cent){
                        centPointsIndex.push(i);
                    }
                });
                if(centPointsIndex.length !== 0) {
                    let pointsInCent = dataSet.filter((v,i)=>i in centPointsIndex);
                    centroids[cent] = Matrix.mean(pointsInCent);
                }
                let pointsInCent = dataSet.filter((v,i)=>i in centPointsIndex);
                centroids[cent] = Matrix.mean(pointsInCent);
            }
        }
        return [centroids,clusterAssment];
    }
}

export default kMeans;