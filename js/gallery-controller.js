'use strict'
function renderGallery() {
  const images = getImgs()
  const strHTMLs = images.map(
    (img) =>
      `      <article class="gallery-card">
                  <img title = "select image" onclick="onSelectImg('${img.id}')" src="${img.url}" alt="">
               </article>`
  )
  const elGallery = document.querySelector('.gallery-container')
  elGallery.innerHTML = strHTMLs.join('')
}
function onFilterImagesByText(ev) {
  setFilterByText(ev.target.value)
  renderGallery()
}
