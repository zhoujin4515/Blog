/**
 * 输入：

6
12 10 20 30 15 23
3
输出：

68
 */

var length = 6
var input = '12 10 20 30 15 23'
var n = 3
var arr = input.split(' ').map(i => parseInt(i))
console.log(arr)
var max = 0
var res = 0

for (let i = 0; i < length - n; i++) {
  let sum = arr.slice(i, n).reduce((a, b) => a + b)
  if (sum > max) max = sum
}

console.log(max)