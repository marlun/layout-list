module.exports = function splitBesideActive (list) {
  const current = list.find(item => item.active)

  if (current === null) return null

  // Look at the parent window, if its direction is "row" we can just add
  // another window to it, if not then we have to convert the current window
  // into a container window and create two new windows inside (one of them
  // being the current one)
  let parent = list.find(item => item.id === current.parent)
  if (parent === undefined || parent.direction === 'column') {
    parent = current
    parent.direction = 'row'
    list.push({ id: list.length, parent: parent.id, order: 0 })
  }

  // To know what to set as the order property we get the current highest
  // order of the siblings and add one.
  const siblings = list.filter(item => item.parent === parent.id)
  const nextOrder = Math.max(...siblings.map(win => win.order)) + 1

  list.push({
    id: list.length,
    parent: parent.id,
    order: nextOrder,
    active: true
  })

  // Make sure we don't have two active items
  delete current.active
}
