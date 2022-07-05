/**
 * 
 * 小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
 * 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，
 * 聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 
 * 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
 * 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
 * 
 * 输入: root = [3,2,3,null,3,null,1]
 * 输出: 7 
 * 解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/house-robber-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

var root = new TreeNode(3, new TreeNode(2, undefined, 3), new TreeNode(3, undefined, 1))
console.log(root) 

var map = new Map()
function rob(root) {
  if(root === null) {
    return 0
  }
  let result
  if (map.get(root)) {
    return map.get(root)
  }
  // 偷根节点
  let yesTotal = root.val
  if (root.left) {
    yesTotal += rob(root.left.left) + rob(root.left.right)
  }
  if (root.right) {
    yesTotal += rob(root.right.left) + rob(root.right.right)
  }
  // 不偷根节点
  let noTotal = rob(root.left) + rob(root.right)
  result = Math.max(yesTotal, noTotal)
  map.set(root, result)
  return result
}