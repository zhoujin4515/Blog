/* 输入：

8
123 124 125 121 119 122 126 123
输出：

1 2 6 5 5 6 0 0
*/
var heights = '123 124 125 121 119 122 126 123'.split(' ').map(i => parseInt(i))
var length = heights.length
var res = []
for (let i = 0; i < length; i++) {
  var f = 0
  for (let j = i + 1; j < length; j++) {
    if (heights[j] > heights[i]) {
      f = j
      break;
    }
  }
  res.push(f)
}
console.log(res)