const U = {
  uncurry: f => arr => arr.reduce((p, c) => p(c), f),
  tap: f => x => (f(x), x), // eslint-disable-line no-sequences
  trampline: fn => (...args) => {}, // TODO
}
const _S = require('sanctuary')
const $ = require('sanctuary-def')
const F = require('fluture')
const FT = require('fluture-sanctuary-types')

const options = {
  checkTypes: true,
  env: [..._S.env, ...FT.env],
}

const S = _S.create(options)
const def = $.create(options)

module.exports = {
  $,
  U,
  S,
  F,
  FT,
  def,
}

// const { parallel, encaseP, fork } = F
// const { pipe } = S

// const inc = def([
//   'inc',
//   {},
//   [$.Number, $.Number],
//   x => x + 1,
// ])

// pipe([
//   U.tap(console.log),
//   inc,
//   U.tap(console.log),
//   inc,
//   U.tap(console.log),
// ])(100)

// console.log(F.parallel)
