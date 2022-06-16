var input = '(ed(et(oc))el)'//'(u(love)i)'
function main(s) {
  var str = ''
  var res = []
  for (let i of s) {
    if (i === '(') {
      if (str.length) res.push(str)
      str = ''
    } else if(i === ')') {
      str = str.split('').reverse().join('')
      let top = res.pop()
      str = (top || '') + str
    } else {
      str += i
    }
  }
  
  return str
}

// "((eqk((h))))"

