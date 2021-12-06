var _ = {}
_.type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

const REPLACE = 0
const REORDER = 1
const PROPS = 2
const TEXT = 3

_.isString = function isString(list) {
  return _.type(list) === 'String'
}

_.each = function each(array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

function diff(oldTree, newTree) {
  var index = 0
  var patches = {}
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

function dfsWalk(oldNode, newNode, index, patches) {
  var currentPatch = []

  // Node is removed
  if (newNode === null) {
  
  // TextNode content replacing
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({type: TEXT, content: newNode})
    }
  // Nodes are the same, diff old node`s props and children
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // Diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({type: PROPS, props: propsPatches})
    }
    // Diff children
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children, 
        newNode.children, 
        index, 
        patches, 
        currentPatch
      )
    }
  // 节点不相同，则替换旧的节点
  } else {
    currentPatch.push({ type: REPLACE, node: newNode})
  }

  if (currentPatch.length) {
    console.log(currentPatch, index, '---------')
    patches[index] = currentPatch
  }
}

function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index
  _.each(oldChildren, function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches)
    leftNode = child
  })
}

function listDiff(oldChildren, newChildren, key) {
  return { moves : [], children: newChildren }
}

function diffProps(oldNode, newNode) {
  var count = 0
  var oldProps = oldNode.props
  var newProps = newNode.props

  var key, value
  var propsPatches = {}

  // Find out different properties
  for (key in oldProps) {
    value = oldProps[key]
    if (newProps[key] !== value) {
      count++
      propsPatches[key] = newProps[key]
    }    
  }      
  
  // Find out new property
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // If properties all are identical
  if (count === 0) {
    return null
  }

  return propsPatches
}

function isIgnoreChildren(node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}