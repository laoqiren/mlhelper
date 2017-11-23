# Vector utils

## constructor(arr: Array\<number>)
*arr:* One-dimensional array.

## argSort(): Array\<number>
The sorted index of array.

## static sign(arr: number|Array\<number>): number|Array\<number>

For each element, when its value equals to 0 returns 0, else if it's larger than 0 returns 1 else returns -1. If arr is a number, just return a result number.

## static rand(m: number)
Create specific number of random numbers between 0 and 1.

```js
const Vector = require('mlhelper').utils.Vector;

const arr = [4,7,1,8,2];
const vect = new Vector(arr);

expect(vect.argSort()).to.eql([2,4,0,1,3]); //true
expect(Vector.sign([-2,2,0,4])).to.eql([-1,1,0,1]); //true
expect(Vector.sign(-6)).to.eql(-1); // true
```