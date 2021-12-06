chrome.storage.local.get(['text'], function(result) {
      if (result.text) {
            document.querySelector('textarea').innerHTML = 
                  result.text
      }
})

function setText(val) {
      chrome.storage.local.set({text: val}, function(result) {
            console.log('成功')
      })
      document.getElementById('content').innerHTML =
            marked.parse(val);
}

document.querySelector('textarea').onchange = function(e) {
      setText(e.target.value)
}

// install()