// 使用 async
var fetch = require('node-fetch')

let fetchData = async function() {
  var result = await fetch('https://api.github.com/users/github')
  console.log(result)
}

fetchData()