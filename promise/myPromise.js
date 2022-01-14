// 手撸promise
const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise
/**
 * 状态常量
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function transtion(promise, state, result) {
  if(promise.state === PENDING) {
    promise.state = state
    promise.result = result
    setTimeout(()=> {
      handleCallbacks(promise.callbacks, state, result)
    },0)
  }
}

function Promise(f) {
  this.state = PENDING
  this.result = null
  this.callbacks = []

  let onFulfilled = value => transtion(this, FULFILLED, value)
  let onRejected = reason => transtion(this, REJECTED, reason)
  let ignore = false

  const resolve = (value) => {
    if (ignore) return
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }

  const reject = (reason) => {
    if(ignore) return
    ignore = true
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject }
    
    if (this.state === PENDING) {
      this.callbacks.push(callback)
    } else {
      setTimeout(()=> {
        handleCallback(callback, this.state, this.result)
      }, 0)
    }
  })
}
function handleCallbacks(callbacks, state, result) {
  while(callbacks.length) handleCallback(callbacks.shift(), state, result)
}
function handleCallback(callback, state, result) {
  const { onFulfilled, onRejected, resolve, reject } = callback
  try{
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch(e) {
    reject(e)
  }
}

const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    const reason = new TypeError('type error')
    return reject(reason)
  }

  if (isPromise(result)) {
    return result.then(resolve, reject)
  }

  // 如果 result 是一个 thenable 对象。先取 then 函数，再 call then 函数，重新进入 The Promise Resolution Procedure 过程。
  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject)
      }
    } catch(e) {
      return reject(e)
    }
  }

  return resolve(result)
}

module.exports = Promise


var p1 = new Promise((res, rej) => {
  setTimeout(()=> {
    res('houhou')
  }, 100)
})

var p2 = new Promise((res, rej) => {
  setTimeout(()=> { rej('rej') }, 1000)
})

function constrFn(resolve, reject) {
  const p = new Promise((res) => {
    res('p')
  })
  const pp = new Promise((res) => {
    res(p)
  })
  const ppp = new Promise((res) => {
    res(pp)
  })
  resolve(ppp)
}


var promise1 = new Promise(constrFn)