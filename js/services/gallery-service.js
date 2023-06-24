'use strict'
const IMG_STORAGE_KEY = 'imgDB'
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
let gfilterByLetters = ''

_createImgs()
function getImgs() {
  return filterImagesByText()
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
  let images = loadFromStorage(IMG_STORAGE_KEY)
  if (!images || !images.length) {
    images = keyWords.map((keyWord, idx) => _createImg(idx, keyWord))
  }
  gImgs = images
  _saveImagesToStorage()
}
function getImgById(imgId) {
  const images = getImgs()
  return images.filter((img) => imgId === img.id)[0]
}
function _saveImagesToStorage() {
  saveToStorage(IMG_STORAGE_KEY, gImgs)
}
function filterImagesByText() {
  return gImgs.filter((image) => {
    const keywords = image.keywords.join('').toLowerCase()
    return keywords.includes(gfilterByLetters.toLowerCase())
  })
}
function setFilterByText(letters) {
  gfilterByLetters = letters
}
