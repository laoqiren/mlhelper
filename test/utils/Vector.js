const Vector = require('../../dist/index').utils.Vector;
const expect = require('chai').expect;

const arr = [4,7,1,8,2];
const vect = new Vector(arr);

describe('Vector',()=>{
    describe('#argSort()',()=>{
        it('should return the sorted index of the array',()=>{
            expect(vect.argSort()).to.eql([2,4,0,1,3]);
        });
    });

    describe('#sign()',()=>{
        it('should return array when sign(Array<number>)',()=>{
            expect(Vector.sign([-2,2,0,4])).to.eql([-1,1,0,1]);
        });

        it('should return -1 when number is lower than 0',()=>{
            expect(Vector.sign(-6)).to.eql(-1);
        });

        it('should return 1 when number is larger than 0',()=>{
            expect(Vector.sign(6)).to.eql(1);
        });

        it('should return 0 when number is equal to 0',()=>{
            expect(Vector.sign(0)).to.eql(0);
        }); 
    });

    describe('#rand()',()=>{
        it('should return n of random number',()=>{
            expect(Vector.rand(3)).to.have.lengthOf(3);
        });
    });
});