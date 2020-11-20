function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}

timeout(10000)
  .then(value => {
    // 'done'
    console.log(value)
  })

// promise 新建后就会立即执行
let promise = new Promise(function(resolve, reject) {
  console.log('Promise')
  resolve()
})

promise
  .then(() => {
    console.log('resolved.')
  })

console.log('Hi!')
// promise Hi resolved

// const promise1 = new Promise(function (resolve, reject) {
//   resolve('ok');
//   setTimeout(function () { throw new Error('test') }, 0)
// });
// promise1.then(function (value) { console.log(value) });

// Promise是一个构造函数， 用于生成 promise 实例
// Promise对象用于表示一个异步操作的最终完成 (或失败), 及其结果值
const myPromise = new Promise(function(resolve, reject) {
  const result = false
  if(result) {
    // 当异步处理顺利完成且返回结果时
    resolve(result)
  } else {
    // 当异步处理失败且返回失败原因时
    reject(result)
  }
})

myPromise
  .then(result => {
    console.log('resolve,' + result)
  })
  .catch(e => {
    console.log('reject,' + e)
  })


// 在旧式回调 API 中创建 Promise
const wait = function(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}

wait(1000)
  .then(() => {
    console.log('一秒后： 改变setTimeout')
  })

// async
const myAsyncFun = async function() {
  await wait(2000)
  console.log('两秒后：使用async函数')
}

myAsyncFun()

// 应用
// 加载图片的 promise
var imagePath = function(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image()
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function(e) {
      reject(e)
    }
    img.src = url
  })
}