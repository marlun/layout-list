const moveActiveVertically = require('./moveActiveVertically')

module.exports = function moveActiveUp (list) {
  return moveActiveVertically(list, 'up')
}
