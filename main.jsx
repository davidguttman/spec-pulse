var React = require('react')
var THREE = require('three')
var R3 = require('react-three')

var LED = require('./led.jsx')

var Mesh = R3.Mesh
var Scene = R3.Scene
var Renderer = R3.Renderer
var Object3D = R3.Object3D
var AmbientLight = R3.AmbientLight
var PerspectiveCamera = R3.PerspectiveCamera

var Main = module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      points: []
    }
  },

  render: function() {
    console.log('this.props.points', this.props.points)

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

          { this.props.points.map(function (point) {
            return <LED position={point.point} />
          }) }

        </Scene>
      </Renderer>
    )
  }
})
