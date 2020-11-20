var fs = require('fs');
var path = require('path');

var readdirpromise = function(dir) {
  return new Promise(function(resolve, reject){
    fs.readdir(dir, function(er, files) {
      if (er) reject(er)
      resolve(files)
    })
  })
}

var statpromise = function(path) {
  return new Promise(function(resolve, reject){
    fs.stat(path, function(er, stat) {
      if(er) reject(err)
      resolve(stat)
    })
  })
  
}

//  join(dir, file)
var findLargestFile = function(dir) {
  return readdirpromise(dir)
    .then(
      function(files) {
        let promises = files.map(function(item) {
          return statpromise(path.join(dir, item))
        })
        return Promise.all(promises).then(function(stats){
          return {stats, files}
        })
      }
    )
    .then(
      function(data) {
        console.log(data)
        let largest = data.stats
          .filter(function(item) {
            if (item.isFile()) return item
          })
          .reduce(function(prev, next){
            if (prev.size > next.size) return prev
            return next
          })
        
        return data.files[data.stats.indexOf(largest)]
      }
    )
    
}

findLargestFile('../../')
  .then(function(filename){
    console.log(filename, '最大的文件')
  })
  .catch(function(e) {
    console.log(e)
  })

function findLargest(dir, cb) {
    // 读取目录下的所有文件
    fs.readdir(dir, function(er, files) {
        if (er) return cb(er);

        var counter = files.length;
        var errored = false;
        var stats = [];

        files.forEach(function(file, index) {
            // 读取文件信息
            fs.stat(path.join(dir, file), function(er, stat) {

                if (errored) return;

                if (er) {
                    errored = true;
                    return cb(er);
                }

                stats[index] = stat;

                // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
                if (--counter == 0) {

                    var largest = stats
                        .filter(function(stat) { return stat.isFile() })
                        .reduce(function(prev, next) {
                            if (prev.size > next.size) return prev
                            return next
                        })

                    cb(null, files[stats.indexOf(largest)])
                }
            })
        })
    })
}

// 查找当前目录最大的文件
findLargest('./', function(er, filename) {
  if (er) return console.error(er)
  console.log('largest file was:', filename)
});