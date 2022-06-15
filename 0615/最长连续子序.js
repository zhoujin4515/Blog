/**
 * 有N个正整数组成的一个序列，给定一个整数sum
求长度最长的的连续子序列使他们的和等于sum
返回次子序列的长度，如果没有满足要求的序列 返回-1
 */

 /**
  * 输入：

1,2,3,4,2
6
输出：

3
解析：

1,2,3和4,2两个序列均能满足要求，所以最长的连续序列为1,2,3 因此结果为3
输入：

1,2,3,4,2
20
输出：

-1
解释：

没有满足要求的子序列，返回-1
  */

var input = '1,2,3,4,2,1,1,1,1,1,1,1'.split(',').map(i => parseInt(i))
console.log(input)
var sunFun = (a, b) => a + b

var sum = 100

var length = input.length

function maxWindow(arr, t) {
  var length = arr.length
  let left = 0
  let right = 1
  let res = -1
  while(right < length) {
    var sum = arr.slice(left, right).reduce((a,b) => a + b)
    if (sum < t) {
      right++ 
    } else if (sum === t) {
      if (res < right - left) res = right - left
      left ++
    } else if (sum > t) {
      left++
    }
  }
  return res
}

console.log(maxWindow(input, sum))


// var left = 0
// var right = 0
// var res = -1
// while(right < length) {
//   right++
//   if (left < right) {
//     SUM += input[right]
//     if (SUM === sum) {
//       res = right - left + 1
//       left++
//     }
//   } 
// } 
// console.log(res)