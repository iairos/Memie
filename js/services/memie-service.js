'use strict'
const memes = []
let gMeme = _createMeme()

function getMeme() {
  return gMeme
}
function selectImg(imgId) {
  // const img = getImgById(imgId)
  gMeme.selectedImgId = imgId
  console.log(gMeme)
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
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}
function addLine() {
  gMeme.lines.push(_createLine())
}

function _createLine(txt = 'eat code repeat', size = 30, color = 'green') {
  return {
    id: makeId(),
    txt,
    size,
    color,
    fontFamily: 'Impact',
  }
}
function switchLine() {
  if (
    gMeme.selectedLineIdx === 2 ||
    (gMeme.lines.length === 2 && gMeme.selectedLineIdx === 1)
  ) {
    gMeme.selectedLineIdx = 0
    return
  }
  gMeme.selectedLineIdx++
}
function setLineCoords(x, y) {
  const textY = y
  gMeme.lines.forEach((line, idx) => {
    switch (idx) {
      case 0:
        y = y * 0.1
        break
      case 1:
        y = y * 0.9
        break
      case 2:
        y = y * 0.55
        break
    }
    line.x = x
    line.y = y
    y = textY
    console.log(gMeme)
  })
}
function setLineMeasures(width, height) {
  gMeme.lines[gMeme.selectedLineIdx].width = width
  gMeme.lines[gMeme.selectedLineIdx].height = height
}
// Upload the image to a server, get back a URL
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function,
    // that will create the link to facebook using the url we got
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}
function deleteLine(idx) {
  console.log(idx)
  gMeme.lines.splice(idx, 1)
}
function changeFontFamily(fontFamily) {
  gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
}

function changeFontColor(selectedColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = selectedColor
}
