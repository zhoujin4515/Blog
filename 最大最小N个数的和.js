/* 
*  给定一个数组，编写一个函数来计算它的最大N个数与最小N个数的和。你需要对数组进行去重。
*  
输入：

5
95 88 83 64 100
2

输出：

342
*/
var callSums = (a , b) => a + b
var t = 5
var arr = '3 2 3 4 2 2'.split(' ').map(i => parseInt(i))
var n = 2

var sortArr = Array.from(new Set(arr)).sort((a,b) => a - b)
console.log(sortArr)
var length = sortArr.length
var result = -1
if (length > 2 * n) {
  result = sortArr.slice(0, n).reduce(callSums)
  + sortArr.slice(-n).reduce(callSums)
}
console.log(result)