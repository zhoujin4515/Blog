// 商品价格们
var moneys = [23,30,40,59, 23]
// 最多花费的钱
var max = 89
var res = -1
function main(arr) {
  var length = arr.length
  for (let i = 0; i < length - 2; i++) {
    for (let j = 1; j < length - 1; j++) {
      for (let k = 2; k < length; k++) {
        if (i !== j && j !== k && k !== i) {
          var sum = arr[i] + arr[j] + arr[k]
          if (sum < max && sum > res) res = sum
        }
      }
    }   
  }
  console.log(res)
}
main(moneys)

