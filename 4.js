// 输入字符串s，输出s中包含所有整数的最小和
var input = 'bb1234aa'
var flag = ''
var sums = []
for (var i of input) {
    if (i == '-') {
        flag = '-'
    } else {
        var num = parseInt(i)
        if (!isNaN(num)) {
            if (flag.length === 0) {
                sums.push(num)
            } else {
                flag = flag + i
            }
        } else {
            flag.length && sums.push(parseInt(flag))
            flag = ''
        }
    }
    
}
console.log(sums.reduce((a,b) => a + b, 0))
