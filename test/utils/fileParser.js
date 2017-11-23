const parser = require('../../dist/index').utils.fileParser;
const CSV = parser.CSV;
const path = require('path');
const expect = require('chai').expect;


describe('fileParser',()=>{
    describe('#parseFile()',()=>{
        it('should return matrix like data',()=>{
            let result = parser.parseFile(path.join(__dirname,'./../../assets/testSet.txt'),{
                toNumber: false,
                delimiter: ','
            });
            expect(result).to.have.lengthOf(100);
            expect(result[0]).to.have.lengthOf(5);
        });
    });

    describe('#readCsv()',()=>{
        it('should return instance of CSV',()=>{
            let dt = parser.read_csv(path.join(__dirname,'../../assets/train.csv'),{
                index_col: 0,
                delimiter: ',',
                header: 0,
                dataType: 'number'
            });
            expect(dt).to.be.an.instanceof(CSV);
        });
    });
});

describe('CSV',()=>{
    let dt = parser.read_csv(path.join(__dirname,'../../assets/train.csv'),{
        index_col: 0,
        delimiter: ',',
        header: 0,
        dataType: 'number'
    });
    describe('#getHeader()',()=>{
        it('should return the header line of the dataset',()=>{
            let header = dt.getHeader();
            expect(header).to.be.an('array');
        });
    });
    describe('#drop()',()=>{
        it('should return a new instance of CSV',()=>{
            expect(dt.drop(0)).to.be.an.instanceof(CSV);
        });
    });
    describe('#getClasses()',()=>{
        it('should return the class vector',()=>{
            expect(dt.getClasses()).to.be.an('array');
        });
    });
});