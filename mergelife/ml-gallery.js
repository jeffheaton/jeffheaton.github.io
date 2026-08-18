// Position an element at a document-relative offset (same behavior as
// jQuery's .offset({top, left}) setter).
function setDocumentOffset (el, top, left) {
  if (window.getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }
  const style = window.getComputedStyle(el)
  const rect = el.getBoundingClientRect()
  const curTop = rect.top + window.scrollY
  const curLeft = rect.left + window.scrollX
  const cssTop = parseFloat(style.top) || 0
  const cssLeft = parseFloat(style.left) || 0
  el.style.top = (top - curTop + cssTop) + 'px'
  el.style.left = (left - curLeft + cssLeft) + 'px'
  el.style.zIndex = 5000
}

document.addEventListener('click', function (event) {
  const source = event.target.closest('.ml-img')
  if (!source) return

  const imgName = source.getAttribute('src')
  const m = imgName.match(/mergelife-([0-9a-fA-F\-]+)/)

  window.ml1.updateRule = window.ml1.parseUpdateRule(m[1])
  window.ml1.randomGrid()
  window.ml1.startAnimation()
  const rect = source.getBoundingClientRect()
  setDocumentOffset(window.canvas1, rect.top + window.scrollY, rect.left + window.scrollX)
})

window.canvas1 = document.getElementById('floatingCanvas')
window.ml1 = new MergeLifeRender()
window.ml1.init({rule: '6Eb6-ba3d-70b4-ac6f-baae-2604-8529-8998', canvas: canvas1, cellSize: 2, controls: false})
