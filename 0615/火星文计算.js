/**
 * 输入：

7#6$5#12

输出：

226
 */
var options = {
  '#': (x, y) => (2 * x) + (3 * y) + 4,
  '$': (x, y) => 3 * x + y + 2,
}
var input = '7#6$5#12'
var arr = input.split('#')
var sums = arr.map(i => {
  const $arr = i.split('$')
  if ($arr.length === 2) {
    return options['$'](parseInt($arr[0]), parseInt($arr[1]))
  } else {
    return parseInt(i)
  }
})
var result = sums.reduce((a, b) => {
  return options['#'](a, b)
})
console.log(result)