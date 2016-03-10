require('./node_modules/sanitize.css/sanitize.css')
require('./style.css')

var h = require('hyperscript')
var THREE = require('three')
var React = require('react')
var ReactDOM = require('react-dom')
var ReactTHREE = require('react-three')

var Main = require('./main.jsx')
var pointlist = require('./pointlist')

var app = h('.app')
document.body.appendChild(app)

var sceneprops = {
  width: window.innerWidth,
  height: window.innerHeight,
  points: pointlist()
}

ReactTHREE.render(React.createElement(Main, sceneprops), app)
