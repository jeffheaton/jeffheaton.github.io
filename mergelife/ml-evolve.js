const canvas1 = document.getElementById('myCanvas')
window.ml1 = new MergeLifeRender()
window.ml1.init({
  rule: 'E542-5F79-9341-F31E-6C6B-7F08-8773-7068',
  canvas: canvas1,
  cellSize: 2,
  controls: false,
  resetCount: 250
})
window.ml1.startAnimation()
window.ml1.autoStep = false
const objStats = document.getElementById('textStats').value
const config = JSON.parse(objStats)
const evolve = new MergeLifeGA(config)
evolve.reportTime = 5000

evolve.newTopGenomeCallback = function (evl) {
  document.getElementById('displayRule').textContent = evl.topGenome.rule
  window.ml1.updateRule = window.ml1.parseUpdateRule(evl.topGenome.rule)
  window.ml1.randomGrid()
  window.ml1.autoStep = true
}

evolve.foundGenomeCallback = function (genome) {
  const link = document.createElement('a')
  link.href = `/mergelife/ml-viewer.html?rule=${genome.rule}`
  link.target = '_blank'
  const span = document.createElement('span')
  span.className = 'tab'
  span.textContent = genome.rule
  link.appendChild(span)
  const item = document.createElement('li')
  item.appendChild(link)
  document.querySelector('#rules ul').appendChild(item)
}

evolve.reportCallback = function () {
  document.getElementById('displayRun').textContent = evolve.runCount.toLocaleString()
  document.getElementById('displayEval').textContent = evolve.evalCount.toLocaleString()
  document.getElementById('displayPerf').textContent = evolve.evalsPerMin.toLocaleString()
  document.getElementById('displayNoImprovement').textContent = `${evolve.noImprovement.toLocaleString()} (max patience: ${evolve.config.config.patience.toLocaleString()})`

  if (evolve.topGenome) {
    document.getElementById('displayScore').textContent = evolve.topGenome.score.toFixed(2)
  } else {
    document.getElementById('displayScore').textContent = 'N/A'
  }
}

function requestScore (target, evolve, rule) {
  target.postMessage({
    ruleText: rule,
    rows: evolve.config.rows,
    cols: evolve.config.cols,
    evalCycles: evolve.config.config.evalCycles,
    objective: evolve.config.objective,
    run: evolve.runCount
  })
  evolve.totalEvalCount += 1
}

function startEvolve () {
  const threads = parseInt(document.getElementById('threadCount').value)
  evolve.randomize(evolve.children)

  document.getElementById('displayRule').textContent = evolve.children[0].rule
  window.ml1.updateRule = window.ml1.parseUpdateRule(evolve.children[0].rule)
  window.ml1.randomGrid()
  window.ml1.autoStep = true
  document.getElementById('displayRun').textContent = '...starting up...'

  const workers = []

  for (let i = 0; i < threads; i++) {
    const worker = new Worker('ml-worker.js')
    worker.addEventListener('message', function (e) {
      const message = e.data
      evolve.addScoredChild(message)
      // console.log(`Rule ${e.data.rule} scored ${e.data.score}`)
      evolve.evolve()
      const genome = evolve.children.pop()
      requestScore(e.target, evolve, genome.rule)
    })

    const genome = evolve.children.pop()
    requestScore(worker, evolve, genome.rule)
    workers.push(worker)
  }
}

document.getElementById('evolveButton').addEventListener('click', function () {
  document.getElementById('evolveButton').disabled = true
  startEvolve()
})
document.getElementById('resetButton').addEventListener('click', function () {
  window.location.reload()
})
