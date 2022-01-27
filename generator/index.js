function* generator(i) {
  while (true)
    yield i = i + 10
}

let gen = generator(5)
for(let i = 0; i < 10; i++) {
  console.log(gen.next())
}

function* iterArr(arr) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      yield* iterArr(arr[i])
    }
  } else {
    yield arr
  }
}

let arr = ['a', ['b', 'c'], ['d', 'f']]
let changearr = iterArr(arr)
let newarr = [...changearr]
console.log(newarr)

async function foo() {
  console.log(1)
  await console.log(2)
  console.log(4)
}

foo()
console.log(3)

/**
 * Generator函数本意是iterator生成器，函数运行到yield时退出，并保留上下文，在下次进入时可以继续运行
 */

// 迭代生成器 Generator
/**
 * 1. 普通函数 function . 生成器函数 function*
 * 2. 生成器函数中 yield 是一个关键字，语法和 return 相似。不同之处普通函数
 * 只能 return 一次（包括生成器函数）,生成器函数可以 yield 任意次数。 
 * yield 表达式暂停了生成器的执行，以便稍后可以再次恢复。
 */

// ES6 实现迭代生成器
class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }

  [Symbol.iterator]() {return this}

  next() {
    var value = this.value
    if (value < this.stop) {
      this.value++
      return { done: false, value: value }
    } else {
      return { done: true, value: undefined}
    }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop)
}

// This should "ding" three times
for (var value of range(0, 3)) {
  alert("Ding! at floor #" + value);
}

// ====> class RangeIterator 等价于
// All generators have a built-in implementation of .next() and [Symbol.iterator](). 
// You just write the looping behavior.
function* generatorRang(start, stop) {
  for(var i = start; i < stop; i++) {
    yield i
  }
}

// This should "ding" three times
for (var value of generatorRang(0, 3)) {
  alert("Ding! at floor #" + value);
}

/**
 * 1.迭代器  
 *    Symbol.iterator
 *    next()
 * 2. for of
 *    用于遍历迭代器
 * 3. Generator
 *    迭代器生成器
 * 4. promise
 *    异步处理then
 * 5. async await
 *    使用 Generator 和 Promise 达成迭代器自动执行效果的语法糖 
 */
 var a
 (async function() {
  a = await fetch('https://api.github.com/users/github').catch(e => {
    console.log(e)
  })
  console.log(a)
 })()