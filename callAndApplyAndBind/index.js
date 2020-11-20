// call arguments 是多个对象 apply arguments 是数组 call apply 原理一样，只是处理参数不一样
Function.prototype.call1 = function(context) {
  context.usedFunc = this
  context.usedFunc()
  delete context.usedFunc
}

// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this
Function.prototype.bind1 = function(context, ...outarg) {
  var self = this
  return function(...inarg) {
    return self.apply(context, [...outarg, ...inarg])
  }
}

var value = 'global value'

function foo() {
  console.log(this.value)
}

var bar = {
  value: 'bar value'
}

foo()
foo.call(bar)
