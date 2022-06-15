// function search(grid) {
//   let res = 0
//   grid.forEach((line, i) => {
//       line.forEach((item, j) => {
//           if (item === 1) {
//               dp(i, j)
//           }
//       })
//   });
//   function dp(i, j) {
//     let top = grid[i - 1] ? grid[i - 1][j] : 0
//     let right = grid[i][j + 1] 
//     let bottom = grid[i + 1] ? grid[i + 1][j] : 0
//     let left = grid[i][j - 1]
//     console.log('i =',i,'j =', j, top, right, bottom, left, '----')
//     if (top !== 1) {
//       res++
//     }
//     if (right !== 1) {
//       res++
//     }
//     if (bottom !== 1) {
//       res++
//     }
//     if (left !== 1) {
//       res++
//     }
//   }
//   return res
// }
// const grid = [[1]]
// console.log(search(grid))

// 金字塔
const main = function(n) {
  for (let i = 1; i < n + 1; i++) {
    
  }
}