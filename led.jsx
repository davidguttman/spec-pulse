var React = require('react')
var THREE = require('three')
var R3 = require('react-three')

var Mesh = R3.Mesh
var Object3D = R3.Object3D

var matOn = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0x009900,
  shininess: 30,
  shading: THREE.FlatShading
} )

var matOff = new THREE.MeshPhongMaterial({
  color: 0x222222,
  specular: 0x009900,
  shininess: 30,
  shading: THREE.FlatShading
} )

var LED = module.exports = React.createClass({
  displayName: 'LED',

  getDefaultProps: function() {
    return {
      idx: 0,
      radius: 5,
      isOn: true,
      position: [0, 0, 0]
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var rCur = this.state.radius
    if (rCur === nextProps.radius) return

    this.setState({
      radius: nextProps.radius,
      geo: this.getGeo(nextProps.radius)
    })
  },

  getInitialState: function() {
    var pos = this.props.position.map(function (v) {return v * 100})
    return {
      radius: this.props.radius,
      geo: this.getGeo(this.props.radius),
      pos: new THREE.Vector3(pos[0], pos[1], pos[2]),
      isOn: this.props.isOn
    }
  },

  // componentWillMount: function() {
  //   var self = this
  //   setInterval(function () {
  //     self.setState({isOn: !self.state.isOn})
  //   }, this.props.idx + 250)
  // },

  render: function() {
    var sphereGeo = this.state.geo

    return (
      <Object3D
        position={this.state.pos} >
        <Mesh
          geometry={sphereGeo}
          material={this.state.isOn ? matOn : matOff} />
      </Object3D>
    )
  },

  getGeo: function (r) {
    return new THREE.SphereGeometry(r, 20, 10)
  }
})
