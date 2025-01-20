const canvas1 = document.getElementById('canvas-1')
window.ml1 = new MergeLifeRender()
window.ml1.init({rule: '6Eb6-ba3d-70b4-ac6f-baae-2604-8529-8998', canvas: canvas1, cellSize: 2, controls: false, resetCount: 1000})
window.ml1.startAnimation()

const canvas2 = document.getElementById('canvas-2')
window.ml2 = new MergeLifeRender()
window.ml2.init({rule: 'ea44-55dF-9025-bEad-5f6e-45ca-6168-275a', canvas: canvas2, cellSize: 2, controls: false, resetCount: 1000})
window.ml2.startAnimation()

const canvas3 = document.getElementById('canvas-3')
window.ml3 = new MergeLifeRender()
window.ml3.init({rule: '5688-0f6c-6619-8605-d7e4-4074-de2e-96c8', canvas: canvas3, cellSize: 2, controls: false, resetCount: 1000})
window.ml3.startAnimation()
