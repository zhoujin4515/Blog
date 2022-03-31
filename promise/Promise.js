const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = obj => obj instanceof Promise
/**
 *  1.状态：promise 有三个状态 PENDING FULFILLED REJECTED
 *  2.Then方法：promise的then方法返回一个promise
 *  3.resolvePromise: 特殊的value被resolve时要做特殊处理
 * */ 

// status
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(f) {
  this.status = PENDING
  this.result = null
  this.callbacks = []

  const onFulfilled = (value) => transition(this, FULFILLED, value)
  const onRejected = (resaon) => transition(this, REJECTED, resaon)

  let ignore = false

  const resolve = (value) => {
    if (ignore) {
      return false
    }
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }
  const reject = (resaon) => {
    if (ignore) {
      return false
    }
    ignore = true
    onRejected(resaon)
  }

  try {
    f(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
// transition
function transition(promise, status, result) {
  if (status !== PENDING) return
  
  promise.status = status
  promise.result = result
  setTimeout(() => {
    handleCallbacks(promise.callbacks, promise.status, promise.result)
  }, 0)
}

// Then
Promise.prototype.then = function(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    const callback = { onFulfilled, onRejected, resolve, reject }
    if (this.status === PENDING) {
      this.callbacks.push(callback)
    } else {
      setTimeout(() => handleCallback(callback, this.status, this.result), 0) 
    }
  })
}

const handleCallbacks = function(callbacks, status, result) {
  while(callbacks.length) handleCallback(callbacks.shift(), status, result)
}

const handleCallback = function(callback, status, result) {
  const { onFulfilled, onRejected, resolve, reject } = callback
  try {
    if (status === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (status === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (e) {
    reject(e)
  }
}

// 特殊的value被resolve时要做特殊处理 The Promise Resolution Procedure
const resolvePromise = (promise, result, resolve, reject) => {
  // 如果value是当前这个promise，则报错
  if (result === promise) {
    let resaon = new TypeError('Can not fufill promise with itself')
    return reject(resaon)
  }
  // 如果value是一个promise, 则延续这个promise的状态
  if (isPromise(result)) {
    return result.then(resolve, reject)
  }
  // 如果value是一个包含then方法的对象或者函数，则先取 then 函数，再 call then 函数，重新进入 The Promise Resolution Procedure 过程。
  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject)
      }
    } catch (e) {
      return reject(e)
    }
  }

  return resolve(result)
}

Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise
