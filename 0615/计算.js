
var n = parseInt(readline())
var length = parseInt(readline())
var arr = []
for (let i = 0; i < length; i++) {
    arr.push(readline())
}
var res = arr.splice(n, 1).join('')
arr.sort((a, b) => {
    if(a[0] === b[0]) {
        if (a.length !== b.length) {
            return b.length - a.length
        } else {
            return b < a
        }
    } else {
        return 0
    }
})
// console.log('arr = ' ,arr)
for (let i = 0; i < arr.length; i++) {
  var endIndex = res.length - 1
  var end = res[endIndex]
  if (arr[i][0] === end) {
      res += arr[i]
  }
}
console.log(res)
