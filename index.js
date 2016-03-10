var h = require('hyperscript')
var THREE = require('three')
var React = require('react')
var ReactDOM = require('react-dom')
var ReactTHREE = require('react-three')

var Main = require('./main.jsx')

var app = h('.app')
document.body.appendChild(app)

var w = window.innerWidth-6
var h = window.innerHeight-6

var sceneprops = {
  width:w,
  height:h
}

ReactTHREE.render(React.createElement(Main, sceneprops), app)
