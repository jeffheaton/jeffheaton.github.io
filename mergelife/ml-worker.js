self.importScripts('mergelife.js', 'mergelife-evolve.js')

self.addEventListener('message', function (e) {
  const ruleText = e.data.ruleText
  const rows = e.data.rows
  const cols = e.data.cols
  const objective = e.data.objective
  const evalCycles = e.data.evalCycles
  let sum = 0
  for (let i = 0; i < evalCycles; i++) {
    const renderer = new MergeLifeRender()
    renderer.init({
      rows: rows,
      cols: cols,
      rule: ruleText
    })

    const tracker = new MergeLifeObjective(renderer, objective)
    const score = tracker.objectiveFunctionCycle(false)
    sum += score
  }
  self.postMessage({rule: ruleText, score: sum / evalCycles, run: e.data.run})
})
