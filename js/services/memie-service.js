'use strict'
const memes = []
let gMeme = _createMeme()

function getMeme() {
  return gMeme
}
function selectImg(imgId) {
  const img = getImgById(imgId)
  console.log(gMeme)
  return img
}
function _createMeme(selectedImgId, selectedImg) {
  return {
    id: makeId(),
    selectedImgId,
    selectedImg,
    selectedLineIdx: 0,
    lines: [_createLine()],
  }
}
function setLineTxt(text) {
  console.log(text)
  gMeme.lines[0].txt = text
  console.log(gMeme.lines[0].txt)
}
function addLine() {}
function _createLine(txt = 'eat code repeat', size = 25, color = 'black') {
  return {
    id: makeId(),
    txt,
    size,
    color,
  }
}
