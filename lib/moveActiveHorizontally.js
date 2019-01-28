const assert = require('assert')

module.exports = function moveActiveHorizontally (list, direction) {
  assert(Array.isArray(list), 'list should be type Array')
  assert(['left', 'right'].includes(direction), 'invalid direction')

  const current = list.find(item => item.active === true)
  const parent = list.find(item => item.id === current.parent)
  const target = findTarget(parent, current)

  if (target === null) return

  swapActive(current, target)

  function findTarget (parent, child) {
    // If parent is undefined we've reached the root node
    if (parent === undefined) return null

    // If parent direction is "column" we need to go further up the tree
    if (parent.direction === 'column') {
      const grandpa = list.find(item => item.id === parent.parent)
      return findTarget(grandpa, parent)
    }

    // The simplest scenario is if we're moving to a leaf window, then we can
    // just get the children of our common parent and go to the child with its
    // order property increaed by one
    const children = list.filter(item => item.parent === parent.id)
    let target = direction === 'right'
      ? children.find(item => item.order === child.order + 1)
      : children.find(item => item.order === child.order - 1)

    // If there is no sibling next to the active we move further up the tree
    if (target === undefined) {
      const grandpa = list.find(item => item.id === parent.parent)
      return findTarget(grandpa, parent)
    }

    // If the window we're moving to is a container window we need to do some
    // more complex calculations to make the selection intuitive for the user.
    if (target.direction !== undefined) {
      target = findTargetInContainer(target, current)
    }

    return target
  }

  function findTargetInContainer (parent, current) {
    let target = null
    const children = list.filter(item => item.parent === parent.id)

    // If the user is moving into a window which is split conterwise we
    // target the first window
    const currentParent = list.find(item => item.id === current.parent)
    if (currentParent.direction === 'row' && parent.direction === 'column') {
      target = children[Math.max(...children.map(item => item.order))]
      if (target.direction !== undefined) {
        target = findTargetInContainer(target, current)
      }
      return target
    }

    // If I'm on the last item in a parent which has direction set to
    // 'column', I want to go to the last one in the next as well
    const siblings = list.filter(item => item.parent === current.parent)
    if (current.order === Math.max(...siblings.map(item => item.order))) {
      target = children[Math.max(...children.map(item => item.order))]
      if (target.direction !== undefined) {
        target = findTargetInContainer(target, current)
      }
      return target
    }

    // If the current has order set to 2 we should try to move to the item
    // below with the same order or decrement by 1 until we find one or 0
    for (let i = current.order; i >= 0; i--) {
      if (children[i] !== undefined) target = children[i]
    }

    if (target.direction !== undefined) {
      target = findTargetInContainer(target, current)
    }

    return target
  }

  function swapActive (current, target) {
    delete current.active
    target.active = true
  }
}
