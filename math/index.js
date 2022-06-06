// var str1 = '13'
// var str2 = '3,3,7,4,4,4,4,7,7,3,5,5,5'
// var str3 = '53,80,68,24,39,76,66,16,100,55,53,80,55'

const { syncBuiltinESMExports } = require("module")

// var arr2 = str2.split(',')
// var arr3 = str3.split(',')
// var map = new Map()
// for (let i = 0; i < Number(str1); i++) {
//   var value = map.get(arr2[i])
//   if (value) {
//     value.push(arr3[i])
//   } else {
//     value = [arr3[i]]
//   }
//   map.set(arr2[i], value)
// }
// for (let item of map) {
//   if (item[1].length < 3) {
//     map.delete(item[0])
//   }
//   item[1].sort((a, b) => b - a)
//   item[1].reduce((a, b) => a + b, 0)
//   result.push(sum)
// }
// result.sort((a, b) => b - a)

// console.log()


// 身高体重 身高从低到高，身高相同体重从轻到重，体重相同维持原来顺序
/*
  示例

  输入：

  4
  100 100 120 130
  40 30 60 50
  输出：

  2 1 3 4
  输入：

  3
  90 110 90
  45 60 45
  输出：

  1 3 2
*/
var lines = 3
var h = '90 110 90'
var w = '45 60 45'
var hs = h.split(' ')
var ws = w.split(' ')
var result = []
for (let i = 0; i < lines; i++) {
  result.push([i + 1, parseInt(hs[i]), parseInt(ws[i])])
}
console.log(result) 
const res = result.sort((a, b) => {
  if (a[1] !== b[1]) {
    return a[1] - b[1]
  } else {
    return a[2] - b[2]
  } 
})
console.log(res)
