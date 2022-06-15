/**
 *  给定一个字符串 S 和一个字符串 T，请在 S 中找出包含 T 所有字母的最小子串。(minimum-window-substring)
 *  输入: S = "ADOBECODEBANC", T = "ABC"
 *  输出: "BANC"
 */

let r = minWindow('ADOBECODEBANC', 'ABC')
console.log(r)
function minWindow(s, t) {
  const map = {}
  for (let i = 0; i < t.length; i++) {
    if (map[t[i]]) {
      map[t[i]]++
    } else {
      map[t[i]] = 1
    }
  }

  let left = 0
  let right = 0
  let count = t.length
  let max = Number.MAX_SAFE_INTEGER
  let res = s

  while( right < s.length) {
    if (map[s[right]] > 0) {
      count--
    }
    map[s[right]]--
    right++
    
    while(count === 0) {
      if (right - left < max) {
        max = right - left
        res = s.slice(left, right)
      }
      map[s[left]]++
      if (map[s[left]] > 0) {
        count++
      }
      left++
    }
  }
  return max === Number.MAX_SAFE_INTEGER ? "" : res;
}