// 目标对象
const obj = {
  text: 'obj.text'
}

// 副作用
const effect = function(obj) {
  obj.text = 'Hello World'
  document.write(obj.text)
}

// 代理
const data = new Proxy(obj, {
  get(target, prop) {
    console.log('prop =', prop, 'value =', target[prop])
    return target[prop]
  },
  set(target, prop, value) {
    target[prop] = value
    console.log('value =' , target[prop])
  }
})

effect(data)
