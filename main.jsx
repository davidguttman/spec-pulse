var React = require('react')

var Scene = require('./scene.jsx')
var Config = require('./config.jsx')

var Main = module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      width: 500,
      height: 500,
      points: []
    }
  },

  getInitialState: function() {
    return {
      widthConfig: 250,
      widthScene: 250,
      config: {
        rx: 0.5,
        ry: 0.5
      }
    }
  },

  componentWillMount: function() {
    var widthConfig = 300
    var widthScene = this.props.width - widthConfig
    this.setState({
      widthConfig: widthConfig,
      widthScene: widthScene
    })
  },

  render: function() {
    var style = {
      display: 'flex',
      justifyContent: 'space-between'
    }

    return (
      <div style={style}>
        <Scene
          width={this.state.widthScene}
          height={this.props.height}
          config={this.state.config}
          points={this.props.points} />

        <Config
          width={this.state.widthConfig}
          config={this.state.config}
          onChange={this._configChange }/>
      </div>
    )
  },

  _configChange: function (key, val) {
    var config = this.state.config
    config[key] = val
    this.setState({config: config})
  }
})
