/**
 * 示例

输入：

5
1,0,0,0,1
0,0,0,1,1
0,1,0,1,0
1,0,0,1,1
1,0,1,0,1
输出：

122
说明：

第一行向右整体循环移动一位，得到最大值 11000为24，依次循环，得到最大值122
 */

let length = 5
var arr = [
  [1,0,0,0,1],
  [0,0,0,1,1],
  [0,1,0,1,0],
  [1,0,0,1,1],
  [1,0,1,0,1]
]

function getSum(arr) {
  var res = 0
  for (let i = 0; i < length; i++) {
    let item = arr[i]
    var sums = 0
    var max = 0
    for (let j = 0; j < length; j++) {
      sums = calc(item)
      if (sums > max) max = sums
      item.push(item.shift())
    }
    res += max
  }
  console.log(res)
}

function calc(arr) {
  return parseInt(arr.join(''), 2)
}

getSum(arr)