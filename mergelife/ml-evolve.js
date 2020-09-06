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
const objStats = $('#textStats').val()
const config = JSON.parse(objStats)
const evolve = new MergeLifeGA(config)
evolve.reportTime = 5000

evolve.newTopGenomeCallback = function (evl) {
  $('#displayRule').text(evl.topGenome.rule)
  window.ml1.updateRule = window.ml1.parseUpdateRule(evl.topGenome.rule)
  window.ml1.randomGrid()
  window.ml1.autoStep = true
}

evolve.foundGenomeCallback = function (genome) {
  $('#rules ul').append(
    $('<li>').append(
      $('<a>').attr('href', `/mergelife/ml-viewer.html?rule=${genome.rule}`).attr('target', '_blank').append(
        $('<span>').attr('class', 'tab').append(genome.rule))))
}

evolve.reportCallback = function () {
  $('#displayRun').text(evolve.runCount.toLocaleString())
  $('#displayEval').text(evolve.evalCount.toLocaleString())
  $('#displayPerf').text(evolve.evalsPerMin.toLocaleString())
  $('#displayNoImprovement').text(`${evolve.noImprovement.toLocaleString()} (max patience: ${evolve.config.config.patience.toLocaleString()})`)

  if (evolve.topGenome) {
    $('#displayScore').text(evolve.topGenome.score.toFixed(2))
  } else {
    $('#displayScore').text('N/A')
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
  const threads = parseInt($('#threadCount').val())
  evolve.randomize(evolve.children)

  $('#displayRule').text(evolve.children[0].rule)
  window.ml1.updateRule = window.ml1.parseUpdateRule(evolve.children[0].rule)
  window.ml1.randomGrid()
  window.ml1.autoStep = true
  $('#displayRun').text('...starting up...')

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

$('#evolveButton').click(function () {
  $('#evolveButton').prop('disabled', true)
  startEvolve()
})
$('#resetButton').click(function () {
  window.location.reload()
})
