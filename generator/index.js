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