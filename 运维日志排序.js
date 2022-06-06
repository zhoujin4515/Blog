// 2
// 01:41:8.9
// 1:1:09.211 23:41:08.023
// 1:1:09.211
// 08:01:22.0

var nums = 2
var arr = ['23:41:08.023', '1:1:09.211', '08:01:22.0']

function sort(arr) {
  return arr.sort((a, b) => {
    var ar = a.replace('.', ':').split(':').map(i => parseInt(i))
    var br = b.replace('.', ':').split(':').map(i => parseInt(i))
    for (let i = 0; i < 4; i++) {
      if (ar[i] > br[i]) {
        return 1
      } else if ( ar[i] < br[i]) {
        return -1
      }
    }
    return 0
  })
}
console.log(sort(arr))