/**
 * 
 * 请实现一个简易内存池,根据请求命令完成内存分配和释放。
内存池支持两种操作命令，REQUEST和RELEASE，其格式为：
REQUEST=请求的内存大小 表示请求分配指定大小内存，如果分配成功，返回分配到的内存首地址；如果内存不足，或指定的大小为0，则输出error。
RELEASE=释放的内存首地址 表示释放掉之前分配的内存，释放成功无需输出，如果释放不存在的首地址则输出error。
注意：
1.内存池总大小为100字节。
2.内存池地址分配必须是连续内存，并优先从低地址分配。
3.内存释放后可被再次分配，已释放的内存在空闲时不能被二次释放。
4.不会释放已申请的内存块的中间地址。
5.释放操作只是针对首地址所对应的单个内存块进行操作，不会影响其它内存块。
解答要求
时间限制: 1000ms, 内存限制: 256MB
首行为整数 N , 表示操作命令的个数，取值范围：0 < N <= 100。
接下来的N行, 每行将给出一个操作命令，操作命令和参数之间用 “=”分割

作者：hanaasama
链接：https://leetcode.cn/circle/discuss/ELQZKU/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

输入样例1
2
REQUEST=10
REQUEST=20
输出样例1
0
10

输入样例2
5
REQUEST=10
REQUEST=20
RELEASE=0
REQUEST=20
REQUEST=10
输出样例2
0
10
30
0
 */

var map = new Map()
var length = 100
for (let i = 0; i < length; i++) {
  map.set(i, {
    free: true
  })
}

function run(s) {
  var res = 0
  var arr = s.split('=')
  var order = arr[0]
  var value = parseInt(arr[1])
  try {
    if (!(1 < value < length)) new Error('不合法的命令')
  } catch {
    res = 'error'
  }
  if (order === 'REQUEST') {
    var count = 0
    for (let m of map) {
      // map.getItem
      if (m[1].free && count < value && map.get(m[0] + value - count - 1).free) {
        m[1].free = false
        count++
        if (count === 1) {
          res = m[0]
          m[1].isHeader = true
        }
        m[1].header = res
      }
    }
    return res
  } else if (order === 'RELEASE') {
    var head = map.get(value)
    var o
    if (head.isHeader) {
      o = value
      for (let m of map) {
        if (m[1].header === o) {
          m[1].free = true
          delete m[1].isHeader
          delete m[1].header
        console.log(m, '----')

        }
      }
    } else {
      res = 'error'
    }
  }
}

var tests = [
  'REQUEST=10',
  'REQUEST=20',
  'RELEASE=0',
  'REQUEST=20',
  'REQUEST=10',
  'RELEASE=10',
  'REQUEST=5',
  'REQUEST=8',
]
var test2 = [
  'REQUEST=10',
  'REQUEST=20',
  'RELEASE=0',
  // 'REQUEST=20',
  // 'REQUEST=10',
]
tests.forEach(i => {
  var result = run(i)
  result != undefined && console.log(result)
  // run console.log(run(i))
})

console.log(map)
// console.log(map)

