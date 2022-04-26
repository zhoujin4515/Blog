console.log('start--------')
// 目标对象
const obj = {
  text: 'obj.text',
  text2: 'obj.text2'
}

// 存放副作用函数的桶
let bucket = new Map()
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
  document.write(obj.text)
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
    trigger(target, key)
    target[key] = value
  }
})

// 收集依赖
function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
    console.log(bucket, '桶 get')
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
  effects && effects.forEach(fn => fn())
}

effectInit(effect, data)
window.data = data

data.text = 'caonima'

setTimeout(()=> {
  console.log(bucket, '桶')
})
