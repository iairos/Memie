'use strict'
const keyWords = [
  'funny trump sign politic',
  'cute dog labs animal',
  'cute sleeping baby dog animal',
  'cute sleeping cat animal',
  'funny baby strong',
  'funny history hands',
  'funny baby face',
  'funny movie old',
  'funny baby laugh evil',
  'funny obama laugh politic',
  'funny cute kiss sport',
  'funny tzadik you sign',
  'funny movie leonardo dicaprio cheers',
  'action movie serious sunglasses',
  'funny movie hands',
  'funny movie face laugh',
  'funny vladimir putin sign political',
  'funny movie toy story',
]
let gImgs

_createImgs()
function getImgs() {
  return gImgs
}
console.log(gImgs)
function _createImg(num, keywords) {
  return {
    id: makeId(),
    url: `img/${num + 1}.jpg`,
    keywords: keywords.split(' '),
  }
}
function _createImgs() {
  const images = keyWords.map((keyWord, idx) => _createImg(idx, keyWord))
  gImgs = images
}
