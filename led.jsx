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
      radius: 5,
      isOn: true,
      position: [0, 0, 0]
    }
  },

  render: function() {
    var pos = this.props.position.map(function (v) {return v * 100})
    var sphereGeo = new THREE.SphereGeometry( this.props.radius, 20, 10)

    return (
      <Object3D
        position={new THREE.Vector3(pos[0], pos[1], pos[2])} >
        <Mesh
          geometry={sphereGeo}
          material={this.props.isOn ? matOn : matOff} />
      </Object3D>
    )
  }
})
