SVG.ForiegnObject = SVG.invent({
  create: 'foreignObject',
  inherit: SVG.Element,
  extend: {
   test: function(text) {
      var el = document.createElement("h1")
      el.innerHTML = text;
      this.node.appendChild(el)
      return this
    },
  getChild: function (index) {
    return this.node.childNodes[index]
  },
  construct: {
    foreignObject: function(width, height) {
      return this.put(new SVG.ForiegnObject).size(width, height)
    }
  }
})

