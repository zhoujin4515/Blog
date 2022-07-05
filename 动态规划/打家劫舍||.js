var helper = function(nums) {
  var length = nums.length
  if (length === 0) return 0
  if (length === 1) return nums[0]
  var dp = [0, nums[0]]
  for (let i = 2; i <= length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
  }
  return dp[length]
}
var rob = function(nums) {
  var noHead = nums.slice(1)
  var noEnd = nums.slice(0, -1)
  return Math.max(helper(noHead), helper(noEnd))
};
var result = rob([1,2,3])