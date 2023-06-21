'use strict'
function renderGallery() {
  const images = getImgs()
  const strHTMLs = images.map(
    (img) =>
      `      <article class="gallery-card">
                  <button title = "select" class = "btn gallery-btn" onclick="onSelectImg('${img.id}')">select</button>
                  <img src="${img.url}" alt="">
               </article>`
  )
  const elGallery = document.querySelector('.gallery-container')
  elGallery.innerHTML = strHTMLs.join('')
}
function onSelectImg(imgId) {
  const img = selectImg(imgId)
  gCurrImg = img
  renderMeme(img)
}
