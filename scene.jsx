var React = require('react')
var THREE = require('three')
var R3 = require('react-three')
var Coords = require('coordinate-systems')

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
      width: 500,
      height: 500,
      points: [],
      config: {
        rx: 0.5,
        ry: 0.5,
        ledRadius: 5
      }
    }
  },

  getInitialState: function() {
    return {
      cameraprops: this.getCameraProps(this.props)
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      cameraprops: this.getCameraProps(nextProps)
    })
  },

  render: function() {
    var self = this

    return (
      <Renderer width={this.props.width} height={this.props.height}>
        <Scene
          width={this.props.width}
          height={this.props.height}
          camera="maincamera" >
          <PerspectiveCamera name="maincamera" {...this.state.cameraprops} />
          <AmbientLight color={0xffffff} intensity={0.5} />

          { this.props.points.map(function (point, i) {
            return <LED
              key={i}
              position={point.point}
              idx={i}
              radius={self.props.config.ledRadius} />
          }) }

        </Scene>
      </Renderer>
    )
  },

  getCameraProps: function (props) {
    var aspectratio = props.width / props.height

    var rho = 600
    var theta = (props.config.rx - 0.5) * Math.PI
    var phi = (props.config.ry - 0.5) * Math.PI

    var coords = Coords.sph([rho, theta, phi]).cart()
    var cx = coords[1]
    var cy = coords[2]
    var cz = coords[0]

    return {
      fov: 75, aspect: aspectratio,
      near: 1, far: 5000,
      position: new THREE.Vector3(cx, cy, cz),
      lookat: new THREE.Vector3(0,0,0)
    }
  }
})
