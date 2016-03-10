var xtend = require('xtend')

var defaults = {
  nbr_strips: 16 + 24, // Number light strips
  units: 12.0, // Units per mete
  slen: 1/3.0, // Strip length in meters
  nbr_hi: 16, // Number high-density strips
  radius: 2, // Radius in meters
  topy: -2, // Top Y
  boty: 2 // Bot Y
}

module.exports = function (opts) {
  opts = xtend(opts, defaults)

  var pi = Math.PI
  var phi = (Math.sqrt(5) + 1) / 2 - 1
  var golden_angle = pi * phi

  var lg_rad = opts.radius * opts.units
  var lg_area = Math.sqrt(lg_rad) * pi

  var sm_area = lg_area / opts.nbr_strips
  var sm_rad = Math.sqrt(sm_area / pi)

  var fudge = 0.87 // Fudge factor, since our circles don't actually fill up space entirely.
  var adj_sm_diameter = sm_rad * 2 * fudge

  var cx = 0
  var cz = 0

  var pointlist = []

  var angle, cumulative_area, spiral_rad, x, y, z, density
  for (var i = 0; i < opts.nbr_strips; i++) {
    angle = i*golden_angle
    cumulative_area = i*sm_area
    spiral_rad = Math.sqrt(cumulative_area / pi)

    x = cx + Math.cos(angle) * spiral_rad
    z = cz + Math.sin(angle) * spiral_rad

    density = (i < opts.nbr_hi) ? 144 : 60

    y = opts.topy
    while (y < opts.boty) {
      pointlist.push({point: [x,y,z]})
      y += (opts.units/density)
    }
  }

  return pointlist
}
