const { show } = require('sanctuary')
const $ = require('sanctuary-def')
const type = require('sanctuary-type-identifiers')

//    Writer :: String -> a -> Writer String a
const Writer = log => val => {
  const writer = Object.create(Writer$prototype)
  writer.val = val
  writer.log = log
  return writer
}

Writer['fantasy-land/of'] = x => Writer('')(x)

const writerTypeIdent = 'my-package/Writer@1'

const Writer$prototype = {
  '@@type': writerTypeIdent,
  '@@show': function () {
    const _log = show(this.log)
    const _val = show(this.val)
    return `Writer (${_log}) (${_val})`
  },
  'fantasy-land/map': function (f) {
    return Writer(this.log)(f(this.val))
  },
  'fantasy-land/ap': function (f) {
    // TODO
  },
  'fantasy-land/chain': function (f) {
    const { log, val } = f(this.val)
    return Writer(this.log + log)(val)
  },
  constructor: Writer,
}

/**
 * For type-checking ...
 */

const uncurry = f => arr => arr.reduce((p, c) => p(c), f)

const WriterType = uncurry($.UnaryType)([
  'Writer',
  'http://',
  [],
  x => type(x) === writerTypeIdent,
  ({ val }) => [val],
])

module.exports = { WriterType, Writer }
