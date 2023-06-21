'use strict'

let gElCanvas, gCtx, gCurrImg

function onInit() {
  initCanvas()
  renderGallery()
}

function renderMeme(img) {
  drawImg(img.url)
}
function initCanvas() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')
}
function drawImg(imgSrc) {
  const img = new Image()
  img.src = imgSrc
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight * gElCanvas.width) / img.naturalWidth
    // gElCanvas.width = (img.naturalHeight * gElCanvas.height) / img.naturalWidth
    // width: 400px , height: 427/640 * 400 = 266px
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    addText()
  }
  return img
}
function addText() {
  const meme = getMeme()
  gCtx.textBaseline = 'center'
  gCtx.textAlign = 'center'
  gCtx.font = `${meme.lines[0].size}px Impact`
  gCtx.fillStyle = 'black'
  gCtx.fillText(
    `${meme.lines[0].txt}`,
    gElCanvas.width / 2,
    gElCanvas.height / 2
  )
  //   gCtx.strokeText('This is another example text', 20, 50)
}
function onSetLineTxt(elTxt) {
  console.log(elTxt.value)
  setLineTxt(elTxt.value)
  renderMeme(gCurrImg)
}
// downloadMeme
function onDownloadMeme(elLink) {
  // Protect the image soo attacker could not download imgs from diff domain
  const data = gElCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
  // This protects users from having private data exposed by using images
  // to pull information from remote web sites without permission.
  elLink.href = data
  elLink.download = 'my-img.jpg'
}
