var globalEffects = []
// 目标对象
const data = {
  ok: true,
  text: 'hello world'
}

// 存放副作用函数的桶
var bucket = new WeakMap()
// 当前作用的副作用函数
let activeEffect = undefined

// 注册副作用函数 
const effect = function(fn) {
  activeEffect = fn
  fn()
}

// 代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    return target[key]
  },
  // 拦截设置操作
  set(target, key, value) {
    target[key] = value
    // 将副作用函数取出并执行
    trigger(target, key)
  }
})

// 收集依赖
function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}

// 触发依赖
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => {
    globalEffects.push(fn)
  })
  Promise.resolve().then(() => {
    nextTickCallback()
  })
}

function nextTickCallback() {
  while(globalEffects.length) {
    globalEffects.shift()()
  }
}

effect(() => {
  console.log('执行副作用')
  document.body.innerHTML = obj.ok ? obj.text : 'not'
})
window.obj = obj

obj.text1 = '1'

obj.text2 = '2'


