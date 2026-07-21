$.fn.positionOn = function(element, align) {
    return this.each(function() {
      var target   = $(this);
      var position = element.position();
  
      var x      = position.left; 
      var y      = position.top;
  
      if(align == 'right') {
        x -= (target.outerWidth() - element.outerWidth());
      } else if(align == 'center') {
        x -= target.outerWidth() / 2 - element.outerWidth() / 2;
      }
  
      target.css({
        position: 'absolute',
        zIndex:   5000,
        top:      y, 
        left:     x
      });
    });
  };

  $(document).on('click', '.ml-img', function (event) {
    const source = $(this)
    const imgName = source.attr('src')
    const m = imgName.match(/mergelife-([0-9a-fA-F\-]+)/)

    window.ml1.updateRule = window.ml1.parseUpdateRule(m[1])
    window.ml1.randomGrid()
    window.ml1.startAnimation()
    window.canvas2.offset($(this).offset())
  });

window.canvas1 = document.getElementById('floatingCanvas')
window.canvas2 = $('#floatingCanvas')
window.ml1 = new MergeLifeRender()
window.ml1.init({rule: '6Eb6-ba3d-70b4-ac6f-baae-2604-8529-8998', canvas: canvas1, cellSize: 2, controls: false})
