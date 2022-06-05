// 输入字符串s，输出s中包含所有整数的最小和
var input = 'bb12-34aa'
var flag = ''
var sums = []
for (var i of input) {
    if (i === '-') {
        flag = '-'
    }
    var num = parseInt(i)
    if (num !== NaN) {
        if (!flag) {
            sums.push(num)
        } else {
            flag = flag + num
        }
    } else {
        flag && sums.push(parseInt(flag))
        flag = ''
    }
}
console.log(sums)
