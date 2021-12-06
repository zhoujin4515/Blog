var element = {
  // 节点标签名
  tagName: 'ul',
  // DOM的属性，用一个对象储存键值对
  props: {
    id: 'list'
  },
  // 该节点的子节点
  children: [
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
  ]
}

/**
 * 1. 用 javascript 对象结构表示 DOM 树的结构; 然后用这个树构建真正的 DOM 树，插到文档中
 * 2. 当状态变更的时候，重新构建一个新的 javascript 对象树，然后用新的树和旧的树进行比较，记录两棵树的差异
 * 3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
 */

// element.js
function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props || {}
  this.children = children || []
  this.key = props
    ? props.key
    : void 666

  var count = 0

  _.each(this.children, function (child, i) {
    if (child instanceof Element) {
      count += child.count
    } else {
      children[i] = '' + child
    }
    count++
  })

  this.count = count
}

Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  for (var propName in this.props) {
    el.setAttribute(propName, this.props.propName)
  }

  var children = this.children || []
  children.forEach((child) => {
    var childEl = (child instanceof Element) 
      // 如果子节点也是虚拟DOM, 递归构建DOM节点
      ? child.render() 
      // 如果子节点是字符串，则构建文本节点
      : document.createTextNode(child)
    el.appendChild(childEl)
  })
  return el
}

var el = function(tagName, props, chileren) {
  return new Element(tagName, props, chileren)
}

var ul = el('div', {}, [
  el('p', {}, ['Virtual DOM']),
  el('ul', {id: 'list'}, [
    el('li', {class: 'item'}, ['Item 1']),
    el('li', {class: 'item'}, ['Item 2']),
    el('li', {class: 'item'}, ['Item 3']),
  ]),
  el('div', {}, ['Hello World'])
])

var ul2 = el('div', {}, [
  el('p', {}, ['Virtual DOM!']),
  el('ul', {id: 'list666'}, [
    el('li', {class: 'item'}, ['Item 1']),
    el('li', {class: 'item'}, [
      el('span', {}, ['span'])
    ]),
    el('li', {class: 'item'}, ['Item 3!']),
  ]),
  el('div', {class: 'hahahah'}, ['Hello World!'])
])

var a = diff(ul, ul2)
console.log(a, '----aaa')

var ulRoot = ul.render()
document.body.appendChild(ulRoot)

// // diff 函数
// function diff(oldTree, newTree) {
//   var index = 0
//   var patches = {}
//   dfsWalk(oldTree, newTree, index, patches)
//   return patches
// }

// function dfsWalk(oldTree, newTree, index, patches) {
//   // patches[index] = [...]

//   diffChildren(oldTree.children, newTree.children, index, patches)
// }

// function diffChildren(oldChildren, newChildren, index, patches) {
//   var leftNode = null
//   var currentNodeIndex = index
//   oldChildren.forEach((child, i) => {
//     var newChild = newChildren[i]
//     currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
//       ? currentNodeIndex + leftNode.count + 1
//       : currentNodeIndex + 1
//     dfsWalk(child, newChild, currentNodeIndex, patches)
//     leftNode = child
//   })
// }