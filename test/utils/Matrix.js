const Matrix = require('../../lib/index').utils.Matrix;
const expect = require('chai').expect;

const dataSet = [
    [2,4,6],
    [5,7,1],
    [3,3,1]
]
const dataSet2 = [
    [1,3,5],
    [2,4,7],
    [3,5,8]
]

let matA = new Matrix(dataSet),
    matB = new Matrix(dataSet2);

describe('Matrix',()=>{
   describe('#toArray()',()=>{
       it('should return raw array value',()=>{
           let arr = matA.toArray();
           expect(arr).to.equal(dataSet);
       })
   });

   describe('#add()',()=>{
       it('should return the result of addition',()=>{
           let result = matA.add(matB);
           expect(result.toArray()).to.eql([
               [3,7,11],
               [7,11,8],
               [6,8,9]
           ]);
       });
   });

   describe('#size()',()=>{
       it('should return the size of the matrix',()=>{
           expect(matA.size()).to.eql([3,3]);
       });
   });

   describe('#max()',()=>{
       it('should return the maxiumn value of each row when axis=1',()=>{
           expect(matA.max(1)).to.eql([6,7,3]);
       });
       it('should return the maxiumn value of each column when axis=0',()=>{
           expect(matA.max(0)).to.eql([5,7,6]);
       });
   });

   describe('#min()',()=>{
        it('should return the miniumn value of each row when axis=1',()=>{
            expect(matA.min(1)).to.eql([2,1,1]);
        });
        it('should return the miniumn value of each column when axis=0',()=>{
            expect(matA.min(0)).to.eql([2,3,1]);
        });
    });

   describe('#transpose()',()=>{
        it('should transpose the matrix',()=>{
            expect(matA.transpose()).to.eql([[2,5,3],[4,7,3],[6,1,1]]);
        });
   });

   describe('#ones()',()=>{
       it('should return vector when call ones(m)',()=>{
           expect(Matrix.ones(3)).to.eql([1,1,1]);
       });
       it('should return matrix when call ones(m,n)',()=>{
           expect(Matrix.ones(2,2)).to.eql([[1,1],[1,1]]);
       });
   });

   describe('#zeros()',()=>{
        it('should return vector when call zeros(m)',()=>{
            expect(Matrix.zeros(3)).to.eql([0,0,0]);
        });
        it('should return matrix when call zeros(m,n)',()=>{
            expect(Matrix.zeros(2,2)).to.eql([[0,0],[0,0]]);
        });
    });

   describe('#mean()',()=>{
       it('should return the average value of each row when axis=1',()=>{
           expect(Matrix.mean(dataSet),1).to.be.an('array');
       });
       it('should return the average value of each column when axis=0',()=>{
            expect(Matrix.mean(dataSet),0).to.be.an('array');
        });
   });
});