function schonfinkelize() {
  let args = [...arguments]
  let next = function() {
    let t = [...arguments]
    args = args.concat(t)
    return next
  }

  next.valueOf = function() {
    return args.reduce((prev, curr) => prev + curr)
  }

  next.toString = function() {
    return args.reduce((prev, curr) => prev + curr)
  }

  return next
}


const curry = schonfinkelize(1)(2, 6)(3)()
console.log(curry)