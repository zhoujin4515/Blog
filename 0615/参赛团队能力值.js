/*
输入：

5
3 1 5 7 9
8
输出：

3
说明：

3、5组成一队，1、7一队，9自己一队，输出3
*/
// 统计剩下部分何时的数量
var num = 5
var input = '3 1 5 7 9'.split(' ').sort().map(i => parseInt(i))
var N = 8
var count = 0
var elem = input.filter(n => {
  if (n > N) {
    count++
  } else {
    return n
  }
})
console.log(elem)

var i = 0
var j = num - count - 1
while (i < j) {
    if (elem[i] + elem[j] >= N) {
        count += 1
        i += 1
        j -= 1
    } else {
        i += 1
    }
}

console.log(count)