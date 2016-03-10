var React = require('react')
var rebass = require('rebass')

var Slider = rebass.Slider

var Config = module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      width: 300,
      onChange: function () {},
      config: {
        rx: 0.5,
        ry: 0.5
      }
    }
  },

  render: function () {
    var style = {
      width: this.props.width,
      padding: 20
    }

    return (
      <div style={style}>
        <Slider
          label='Horizontal Rotation'
          name='rx'
          value={this.props.config.rx * 100}
          onChange={this._onChange} />

        <Slider
          label='Vertical Rotation'
          name='ry'
          value={this.props.config.ry * 100}
          onChange={this._onChange} />
      </div>
    )
  },

  _onChange: function (evt) {
    var name = evt.target.name
    var val = evt.target.value
    var fn = this.props.onChange

    switch (name) {
      case 'rx':
        fn(name, val/100)
        break
      case 'ry':
        fn(name, val/100)
        break
      default:
        fn(name, val)
        break
    }
  }
})
