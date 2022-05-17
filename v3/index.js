var globalEffects = []
// 目标对象
const obj = {
  text: 'obj.text',
  text1: 'obj.text1',
  text2: 'obj.text2'
}

// 存放副作用函数的桶
var bucket = new WeakMap()
// 当前作用的副作用函数
let activeEffect = undefined
// 定义副作用函数
const effectInit = function(f, arg) {
  activeEffect = () => {
    f(arg)
  }
  f(arg)
}

// 副作用
const effect = function(obj) {
  console.log(obj.text, 'text')
}
const effect1 = function(obj) {
  console.log(obj.text1, 'text1')
}
const effect2 = function(obj) {
  console.log(obj.text2, 'text2')
}

// 代理
const data = new Proxy(obj, {
  // 拦截读取操作
  get(target, key) {
    track(target, key)
    return target[key]
  },
  // 拦截设置操作
  set(target, key, value) {
    target[key] = value
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

effectInit(effect, data)
effectInit(effect1, data)
effectInit(effect2, data)
window.data = data

data.text = '0'

data.text1 = '1'

data.text2 = '2'


