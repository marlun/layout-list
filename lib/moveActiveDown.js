const moveActiveVertically = require('./moveActiveVertically')

module.exports = function moveActiveDown (list) {
  return moveActiveVertically(list, 'down')
}
