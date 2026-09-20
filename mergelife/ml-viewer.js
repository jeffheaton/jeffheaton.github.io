const canvas1 = document.getElementById('myCanvas')
window.ml1 = new MergeLifeRender()
window.ml1.init({rule: '6Eb6-ba3d-70b4-ac6f-baae-2604-8529-8998', canvas: canvas1, cellSize: 2, controls: true})

const hexCode = document.getElementById('hexCode')
const ruleButton = document.getElementById('ruleButton')
const randomRuleButton = document.getElementById('randomRuleButton')
const selectPredefine = document.getElementById('selectPredefine')
const outputDiv = document.getElementById('outputDiv')

function getUrlParameter (name) {
  const name2 = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name2 + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const ruleText = getUrlParameter('rule')
if (ruleText.length>0 && hexCode) {
  hexCode.value = ruleText
  window.ml1.updateRule = window.ml1.parseUpdateRule(hexCode.value)
  renderTable(window.ml1.updateRule)
  window.ml1.randomGrid()
  window.ml1.startAnimation()
}

if (randomRuleButton) {
  randomRuleButton.addEventListener('click', function(){
    const str = MergeLifeRender.randomRule()
    hexCode.value = str
    window.ml1.updateRule = window.ml1.parseUpdateRule(str)
    renderTable(window.ml1.updateRule)
    window.ml1.randomGrid()
    window.ml1.startAnimation()
  })
}
if (ruleButton) {
  ruleButton.addEventListener('click', function(){
    window.ml1.updateRule = window.ml1.parseUpdateRule(hexCode.value)
    renderTable(window.ml1.updateRule)
    window.ml1.randomGrid()
    window.ml1.startAnimation()
  })
}

if (selectPredefine) {
  selectPredefine.addEventListener('change', function(){
    hexCode.value = selectPredefine.value
    window.ml1.updateRule = window.ml1.parseUpdateRule(hexCode.value)
    renderTable(window.ml1.updateRule)
    window.ml1.randomGrid()
    window.ml1.startAnimation()
  })
}

function renderTable(updateRule) {
    var output = '<table class="table"><thead>';
    output+= '<tr><th>High (&alpha;)</th><th>Range</th><th>Key Color</th><th>Percent (&beta;)</th><th>Index (&gamma;)</th><th>Octet-1</th><th>Octet-2</th></tr>';
    output+= '</thead><tbody>';
    var colors = ['Black','Red','Green','Yellow','Blue','Purple','Cyan','White'];
    var low = 0
    for (var idx = 0; idx < updateRule.length; idx += 1) {
      var obj = updateRule[idx];

      var tgt = obj[1]<0 ? obj[2]+1 : obj[2];
      if(tgt>=8) {
        tgt = 0;
      }
      output+='<tr><td>'+obj[0]+'</td>';

      if(low==obj[0]) {
        output+='<td>NA</td>';
      } else {
        output+='<td>'+low+'-'+(obj[0]-1)+'</td>';
      }
      output+='<td>'+colors[tgt]+'</td>';
      output+='<td>'+  parseInt(100*obj[1])+'%</td>';
      output+='<td>'+ (obj[2]+1)+' ('+colors[obj[2]]+')'+'</td>';
      output+='<td>'+obj[3]+' ('+obj[5]+')'+'</td>';
      output+='<td>'+obj[4]+' ('+obj[6]+')'+'</td>';

      output+='</tr>'
      low = obj[0]
    }
    output+='</tbody></table>'
    outputDiv.innerHTML = output
}
