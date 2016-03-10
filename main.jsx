var React = require('react')
var THREE = require('three')
var R3 = require('react-three')

var Mesh = R3.Mesh
var Scene = R3.Scene
var Renderer = R3.Renderer
var Object3D = R3.Object3D
var AmbientLight = R3.AmbientLight
var PerspectiveCamera = R3.PerspectiveCamera

var sphereGeo = new THREE.SphereGeometry( 75, 20, 10)

var ledMaterial = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0x009900,
  shininess: 30,
  shading: THREE.FlatShading
} )

var LED = React.createClass({
  displayName: 'LED',

  propTypes: {
    position: React.PropTypes.instanceOf(THREE.Vector3),
    quaternion: React.PropTypes.instanceOf(THREE.Quaternion).isRequired
  },

  render: function() {
    return (
      <Object3D
        quaternion={this.props.quaternion}
        position={this.props.position || new THREE.Vector3(0,0,0)} >
        <Mesh
          geometry={sphereGeo}
          material={ledMaterial} />
      </Object3D>
    )
  }
})

var Main = module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      ledData: {
        position: new THREE.Vector3(0,0,0),
        quaternion:new THREE.Quaternion()
      }
    }
  },

  render: function() {
    var aspectratio = this.props.width / this.props.height
    var cameraprops = {
      fov: 75, aspect: aspectratio,
      near: 1, far: 5000,
      position: new THREE.Vector3(0,0,600),
      lookat: new THREE.Vector3(0,0,0)
    }

    return (
      <Renderer width={this.props.width} height={this.props.height}>
        <Scene
          width={this.props.width}
          height={this.props.height}
          camera="maincamera" >
          <PerspectiveCamera name="maincamera" {...cameraprops} />
          <AmbientLight color={0xffffff} intensity={0.5} />
          <LED {...this.props.ledData} />
        </Scene>
      </Renderer>
    )
  }
})
