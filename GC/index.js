// var N = 4
// var strs = '2'

// var list = strs.split(' ').map(i => parseInt(i)).sort((a,b) => a - b)
// var sets  = new Set(list)

// console.log(sets)
// var res = 0
// while(sets.size) {
//     var min = 0
//     for (let i of sets) {
//         if (min === 0) min = i
//         if(i % min === 0) sets.delete(i)
//     }
//     res++
// }

// console.log(res)

/**
 * 有一个特殊的五键键盘，上面有A、Ctrl-C、Ctrl-X、Ctrl-V、Ctrl-A A键在屏幕上输出一个字母A，Ctrl-C将当前所选的字母复制到剪贴板，Ctrl-X将当前选择的字母复制到剪贴板并清空所选择的字母，Ctrl-V将当前剪贴板的字母输出到屏幕，Ctrl-A选择当前屏幕中所有字母
条件如下：

剪贴板初始为空
新的内容复制到剪贴板会覆盖原有内容
当屏幕中没有字母时,Ctrl-A无效
当没有选择字母时Ctrl-C、Ctrl-X无效
当有字母被选择时A和Ctrl-V这两个输出功能的键，会先清空所选的字母再进行输出
给定一系列键盘输入，输出最终屏幕上字母的数量
 
示例一

输入：

1 1 1
输出：

3
示例二

输入：

1 1 5 1 5 2 4 4
输出：

2
*/

var input = '1 1 1 1 1 1 4 3 2'.split(' ')
var display = ''
for (let i of input) {
    f(i)
}

var copy = ''
var selete = ''
function f(opt) {
    if (opt == 1) {
        // 输入A
        if (selete) display = 'A'
        else display += 'A'
        selete = ''
    } else if (opt == 2) {
        // 复制
        if(selete) copy = selete
    } else if (opt == 3) {
        // 剪切
        copy = selete
        if (selete) display = ''
    } else if (opt == 4) {
        if (!copy) return
        // 粘贴
        if (selete) {
            display = copy
            selete = ''            
        } else display += copy
    } else if (opt == 5) {
        // 全选
        selete = display
    }
    console.log('opt =', opt, 'display = ', display)
}
// console.log(display)