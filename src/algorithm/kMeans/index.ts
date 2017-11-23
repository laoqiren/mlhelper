import Matrix from '../../utils/matrix';
import Vector from '../../utils/vector';
import * as _ from 'lodash';
import * as util from 'util';

class kMeans {
    private dataSet: Matrix;
    private k: number;

    /**
     * Creates an instance of kMeans.
     * @param {Array<Array<number>>} dataSet 
     * @param {number} k how many centroids.
     * @memberof kMeans
     */
    constructor(dataSet: Array<Array<number>>,k: number){
        this.dataSet = new Matrix(dataSet);
        this.k = k;
    }
    /**
     * 随机创建K个初始质心 Random creation of K initial centroids
     * 
     * @returns {Array<Array<number>>} 
     * @memberof kMeans
     */
    createCent(): Array<Array<number>>{
        let n = this.dataSet.size()[1];
        let centroids = <Array<Array<number>>>Matrix.zeros(this.k,n);

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
    /**
     * 计算两点欧式距离 Calculating the Euclidean distance between two points
     * 
     * @param {Array<number>} vec1 vector 1.
     * @param {Array<number>} vec2 vector 2.
     * @returns {number} 
     * @memberof kMeans
     */
    distEclud(vec1: Array<number>,vec2: Array<number>): number{
        return Math.sqrt(_.sum(_.zipWith(vec1,vec2,(a,b)=>(a-b)**2)));
    }
    /**
     * 聚类函数cluster function
     * 
     * @param {number} [max=50 as number]  Maximum iterations
     * @returns {[Array<Array<number>>,Array<Array<number>>]} 
     * @memberof kMeans
     */
    cluster(max=50 as number): [Array<Array<number>>,Array<Array<number>>]{
        let m = this.dataSet.size()[0],
            dataSet = this.dataSet.arr;
        let clusterAssment = <Array<Array<number>>> Matrix.zeros(m,2), //各个实例的聚类结果，结果包含所属质心，和该实例到所属质心的距离
            centroids = this.createCent(), //存放各个质心向量
            clusterChanged = true, // 标识聚类情况发生变化，只要有一个实例的聚类发生变化，设为true
            k = this.k;  // 质心个数
        let num = 0; // 收敛次数
        while(clusterChanged){
            if(++num>max){ //超过最大收敛次数，退出循环
                break;
            }

            clusterChanged = false;
            for(let i=0; i<m; i++){
                let minDist = Infinity, //初始化某个实例到各个质心的最小距离为无穷大
                    minIndex = -1;  //和当前实例距离最小的质心
                for(let j=0; j<k; j++){
                    let distIJ = this.distEclud(centroids[j],dataSet[i]);
                    if(distIJ < minDist){
                        minDist = distIJ; //更新最小距离和质心
                        minIndex = j;
                    }
                }
                if(clusterAssment[i][0]!==minIndex){ //聚类发生变化
                    clusterChanged = true;
                }
                clusterAssment[i] = [minIndex,minDist**2]; //更改当前实例的聚类信息
            }
           
            for(let cent=0; cent<k; cent++){
                let centPointsIndex = [];
                clusterAssment.forEach((v,i)=>{ //找到属于当前质心所在簇的所有实例
                    if(v[0]===cent){
                        centPointsIndex.push(i);
                    }
                });
                if(centPointsIndex.length !== 0) {
                    let pointsInCent = dataSet.filter((v,i)=>i in centPointsIndex); //根据位置找到实例向量
                    centroids[cent] = Matrix.mean(pointsInCent); //更新质心向量，每个特征值为该簇所以实例该特征的平均值
                }
            }
        }
        return [centroids,clusterAssment];
    }
}

export default kMeans;