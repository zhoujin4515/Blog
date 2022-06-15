/**
 * 输入三个参数（n,m,t)
1、n即代表会种下编号1——n-1 的树；例：输入6 则有这样的一排树 1 2 3 4 5
2、m表示砍下对应编号的树木，输入值为一行字符串 编号用空格隔开 例：“2 4” 代表砍掉 编号为2 和 4的树木
3、t 代表可以补种的树木 例：2 ，即可以补种两颗树
求补种后，输出最长的编号连续的一排树木数
若输入 n =6 m = “2 4” t = 1 输出3 （因为可以补种 2 得连续编号1-2-3 长度为3 或者补种4 得连续编号 3-4-5 长度也为3 ）

作者：lekwring
链接：https://leetcode.cn/circle/discuss/6sBbBT/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */


var n = 10
var m = '2 4 8'
var t = 3
var arr = []
for (let i = 0; i < n - 1; i++) {
  arr.push(0)
}
var deletes = m.split(' ')
arr[deletes[0] - 1] = 1
arr[deletes[1] - 1] = 1
console.log(arr)

function minWindow(arr, t) {
  var length = arr.length
  let left = 0
  let right = 1
  let res = 0
  while(right < length) {
    var sum = arr.slice(left, right).reduce((a,b) => a + b)
    if (sum <= t) {
      right++
      if (res < right - left) {
        res = right - left 
      }
    } else {
      left++
    }
  }
  return res
}


console.log(minWindow(arr, t))