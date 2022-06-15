/**
 * 
 * 给定一个url前缀和url后缀,通过,分割 需要将其连接为一个完整的url
如果前缀结尾和后缀开头都没有/，需要自动补上/连接符
如果前缀结尾和后缀开头都为/，需要自动去重
约束：不用考虑前后缀URL不合法情况
输入：

/acm,/bb
输出：

/acm/bb
输入：

/abc/,/bcd
输出：

/abc/bcd
输入：

/acd,bef
输出：

/acd/bef
输入：

,
输出：

/
 */


var input = '/acm/,//bb'.replace('//+', '/') //.split(',')
console.log(input)

