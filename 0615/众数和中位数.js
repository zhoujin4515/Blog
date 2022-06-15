/**
 * 示例

输入：

10 11 21 19 21 17 21 16 21 18 16

输出：

21

输入：

2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4

输出：

3

输入：

5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39
输出：

7
————————————————
版权声明：本文为CSDN博主「JOEL-T99」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_47243236/article/details/123264569
 */

var input = '10 11 21 19 21 17 21 16 21 18 16'.split(' ').map(i => parseInt(i))
console.log(input)

var map = new Map()
for (let i of input) {
  if (map.get(i)) {
    map.set(i, map.get(i) + 1)
  } else {
    map.set(i, 1)
  }
}

var sortArr = Array.from(map).sort((a,b) => {
  if (b[1] === a[1]) {
    return a[0] - b[0]
  } else {
    return b[1] - a[1]
  }
})
var resArr = sortArr.filter(i => {
  return i[1] === sortArr[0][1]
})

var res
var length = resArr.length
var half = parseInt(length / 2)
console.log(resArr, half, 'resarr')
if (length % 2 === 0) {
  res = (resArr[half][0] + resArr[half - 1][0]) / 2
} else {
  res = resArr[half][0]
}

console.log(res)