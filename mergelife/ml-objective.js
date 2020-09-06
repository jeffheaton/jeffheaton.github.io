const canvas1 = document.getElementById('myCanvas')
window.ml1 = new MergeLifeRender()
window.ml1.init({rule: $("#hexCode").val(),
  canvas: canvas1,
  cellSize: 2,
  controls: false})
window.ml1.startAnimation()
window.ml1.autoStep = false

$("#ruleButton").click(function(){
  window.ml1.autoStep = true
  const objStats = $('#textStats').val()
  const config = JSON.parse(objStats)
  window.ml1.updateRule = window.ml1.parseUpdateRule($("#hexCode").val())
  window.ml1.stepCount = 0
  window.ml1.randomGrid(window.ml1.grid[window.ml1.currentGrid])
  $('#ruleButton').prop("disabled",true)
  window.mlLog = "Cycle #1\n"
  window.cycle = 1
  window.evalSum = 0
  window.evalCycles = config.config.evalCycles
  window.ml1.randomGrid()

  const tracker = new MergeLifeObjective(window.ml1, config.objective)
  window.ml1.postRenderFunction = function(ctx) {
    if (window.ml1.autoStep) {
      const s = JSON.stringify(tracker.track())
      $("#status").text(`Cycle #${window.cycle}: ${s}`)
      window.mlLog += s + '\n'
      if (tracker.hasStabilized()) {
        window.cycle += 1
        if (window.cycle>window.evalCycles) {
          $("#outputDiv").text(window.mlLog)
          window.ml1.autoStep = false
          $('#ruleButton').prop("disabled",false)
          const finalScore = window.evalSum / window.evalCycles
          $("#status").text(`Final Score: ${finalScore}`)
        } else {
          const score = tracker.scoreCycle()
          window.evalSum += score
          window.mlLog += `Cycle score: ${score}`
          window.mlLog += `*** Cycle #${window.cycle} ***\n`
          window.ml1.stepCount = 0
          window.ml1.randomGrid(window.ml1.grid[window.ml1.currentGrid])
          tracker.init()
        }
      }
    }
  }
})
