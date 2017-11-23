# File Parser utils

## parseFile(filePath: string,options: object): Array<Array\<any>>
Parsing with simple files.

### filePath:
the absolute file path to read.
### options: \<object>
* options.toNumber \<boolean> wheather to transfer data to Number. Default to false.
* options.delmiter \<string> delmiter. Default to '\t'.

## read_csv (filePath: string,options): CSV

Dealing with complex CSV files.

### filePath:
the absolute file path to read.
### options: \<object>.
* index_col \<boolean|number> when set to true, the first column of data will be regarded as the counter column. Default to be false.
* delimiter \<string> delmiter for every line. Default to be ','.
* header \<Array<string>|number> Can be the vector of custom header line or the index of the header line. default to 0.
* dataType \<string> the type of datas, default to 'number'.
* classType \<string> the type of the last column of each line. default to 'number'.

### return: 
instance of CSV.

## write_csv (filePath: string,data: Array<Array\<any>>,options): void

### filePath: 
absolute path of the file to write.

### data:
matrix like datas to write.
### options \<object>
* options.index: \<boolean>. if set to be true, it will add a index column for each line. default to false.
* header: \<Array\<any>>. custom header to add to the first line. default to [].

## class CSV

### getHeader(): Array\<string>
Get the header line of the dataset.

### drop(label: string | number): CSV

*label:* delete the specific number of column or the column of specific label.

### getClasses(): Array\<any>
Get the last column of every line.

```js
let dt = parser.read_csv(path.join(__dirname,'../../../assets/train.csv'),{
    index_col: 0,
    delimiter: ',',
    header: 0,
    dataType: 'number'
});

let labels = dt.getClasses();

let dataSet =dt.drop('quality').values;

// ...
parser.write_csv(path.join(__dirname,'./result.csv'),resultSet,{
    header: ['ID','quality']
});
```