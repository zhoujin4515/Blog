(function() {
  let watch = function(obj, name, func) {
    let value = obj[name]
    console.log('watch初始化')
    Object.defineProperty(obj, name, {
      get: function() {
        console.log('执行get, vaule = ' + value)
        return value
      },
      set: function(newValue) {
        console.log('执行set, newVaule = ' + newValue)
        value = newValue
        func(value)
      }
    })
    if(value) obj[name] = value
  }
  this.mywatch = watch
}())

let obj = {
  value: 1
}

mywatch(obj, 'value', function(val) {
  console.log('obj 对象 value 属性 被改变， 执行watch回调函数 obj.value = ' + val)
})

obj.value = 3
console.log(obj.value, 'obj.value')
obj.value = 4
console.log(obj.value, 'obj.value')
