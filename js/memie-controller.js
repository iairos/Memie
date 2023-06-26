'use strict'
/**
 * TODO:
 * 1.Add Css
 * 3.Add to lines array to each line an line.x
 * and line.y coords (so can be found on canvas clicked).
 *
 * DONE:
 * 2.Add value to input field (so can be edited).
 */
let gElCanvas, gCtx, gCurrImg, gIsStroke

function onInit() {
  gIsStroke = false
  hideEditor()
  initCanvas()
  renderGallery()
  showGallery()
}
function hideGallery() {
  document.querySelector('.gallery-container').style.display = 'none'
  document.querySelector('.gallery-filter').style.display = 'none'
}
function showGallery() {
  document.querySelector('.gallery-container').style.display = 'flex'
  document.querySelector('.gallery-filter').style.display = 'flex'
}
function hideEditor() {
  document.querySelector('.meme-container').style.display = 'none'
}
function showEditor() {
  document.querySelector('.meme-container').style.display = 'flex'
}

function initCanvas() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
  // gCtx.clearRect(0, 0, gElCanvas.height, gElCanvas.width)
  const meme = getMeme()
  fillInputWithText()

  const image = getImgById(meme.selectedImgId)
  const img = new Image()
  img.src = image.url
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight * gElCanvas.width) / img.naturalWidth
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    console.log('selectedLineIdx:', meme.selectedLineIdx)

    meme.lines.forEach((line, i) => {
      gCtx.textBaseline = 'center'
      gCtx.textAlign = line.txtAlignDirection
      gCtx.font = ` ${line.size}px ${line.fontFamily}`
      gCtx.fillStyle = line.color
      const lineWidth = gCtx.measureText(
        meme.lines[meme.selectedLineIdx].txt
      ).width
      const lineHeight = gCtx.measureText(
        meme.lines[meme.selectedLineIdx].txt
      ).fontBoundingBoxAscent
      // fix below function
      // setLineMeasures(lineWidth, lineHeight)
      gCtx.strokeText(line.txt, line.x, line.y)
      gCtx.fillText(line.txt, line.x, line.y)
    })
  }
}

function onSetLineTxt(ev) {
  const meme = getMeme()
  // ev.target.value = meme.lines[meme.selectedLineIdx].txt
  const text = ev.target.value
  self.setLineTxt(text)
  self.renderMeme()
}

function onAddLine() {
  let canvasWidth = gElCanvas.width
  const meme = getMeme()
  if (meme.lines.length === 3) return
  addLine()
  handleNewLine()
  setTextAlign('center', canvasWidth)
  renderMeme()
}
function handleNewLine() {
  let centerX = gElCanvas.width / 2
  let centerY = gElCanvas.height
  setLineCoords(centerX, centerY)
}
function onSelectImg(imgId) {
  let canvasWidth = gElCanvas.width
  hideGallery()
  selectImg(imgId)
  handleNewLine()
  setTextAlign('center', canvasWidth)
  showEditor()
  renderMeme()
}
function onSwitchLine() {
  if (getMeme().lines.length > 1) {
    switchLine()
    renderMeme()
  }
}
function onDeleteLine() {
  const meme = getMeme()
  if (!meme.lines.length) return
  deleteLine(meme.selectedLineIdx)
  renderMeme()
}
function onSetTextAlign(direction) {
  let canvasWidth = gElCanvas.width
  setTextAlign(direction, canvasWidth)
  renderMeme()
}

function onChangeFontColor(ev) {
  console.log(ev.target.value)
  changeFontColor(ev.target.value)
  renderMeme()
}
function onChangeFontFamily(fontFamily) {
  console.log(fontFamily)
  changeFontFamily(fontFamily)
  renderMeme()
}
function onChangeFontSize(diff) {
  changeFontSize(diff)
  renderMeme()
}
function onSetStrokeText() {
  setStrokeText()
  renderMeme()
}
// downloadMeme
function onDownloadMeme(elLink) {
  onInit()
  // Protect the image soo attacker could not download imgs from diff domain
  const data = gElCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
  // This protects users from having private data exposed by using images
  // to pull information from remote web sites without permission.
  elLink.href = data
  elLink.download = 'my-img.jpg'
}
function onUploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}
function fillInputWithText() {
  const meme = getMeme()
  const elInput = document.querySelector('#txt')
  if (!meme.lines[meme.selectedLineIdx]) return
  elInput.value = meme.lines[meme.selectedLineIdx].txt
}
