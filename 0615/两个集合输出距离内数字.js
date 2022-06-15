/**
 * 
 * 同一个数轴x有两个点的集合A={A1,A2,…,Am}和B={B1,B2,…,Bm}
A(i)和B(j)均为正整数
A、B已经按照从小到大排好序，AB均不为空
给定一个距离R 正整数，列出同时满足如下条件的(A(i),B(j))数对：
A(i)<=B(j)
A(i),B(j)之间距离小于等于R
在满足1，2的情况下每个A(i)只需输出距离最近的B(j)
输出结果按A(i)从小到大排序

 *  4 5 5
    1 5 5 10
    1 3 8 8 20
 */

var inputs = '4 5 5'.split(' ').map(i => parseInt(i))
var R = inputs[2]
var la = inputs[0]
var lb = inputs[1]

var A = '1 5 5 10'.split(' ').map(i => parseInt(i))
var B = '1 3 8 8 20'.split(' ').map(i => parseInt(i))

for (let i = 0; i < la; i++) {
  let flag = true
  while(B.length && flag) {
    let j = B.shift()
    let r = j - A[i]
    if (r && r < R) {
      console.log(A[i], j)
      flag = false
    }
  }
}


