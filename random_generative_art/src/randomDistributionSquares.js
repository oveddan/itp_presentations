import React from 'react'
import { range } from 'lodash'

const size = 1000

const gridSize = 200
const gridSpacing = size / gridSize

const style = {stroke:'grey',strokeWidth:0.2};

const Grid = () => (
  <g>
    {range(gridSize).map(i => (
      <line key={i} x1={(i + 1) * gridSpacing} y1={0} x2={(i + 1) * gridSpacing} y2={size} style={style} />
    ))}
    {range(gridSize).map(i => (
      <line key={i} y1={(i + 1) * gridSpacing} x1={0} y2={(i + 1) * gridSpacing} x2={size} style={style} />
    ))}
  </g>
)

const randomDistributionSquares = () => (
  <div>
    332-223-2222
    <svg width={size} height={size}>
      <Grid />
    </svg>
  </div>
)

export default randomDistributionSquares
