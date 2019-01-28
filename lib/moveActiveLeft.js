const moveActiveHorizontally = require('./moveActiveHorizontally')

module.exports = function moveActiveLeft (list) {
  return moveActiveHorizontally(list, 'left')
}
