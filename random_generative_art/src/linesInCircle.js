import React, { Component } from 'react'
import { times, map } from 'lodash'

const size = 600

const numberOfLines = 500

const style = {stroke:'black',strokeWidth:0.05};

const clipPath="url(#circle)"
const filter = "url(#turb)";

const LinesInCircle = ({ straightLines} ) => (
  <svg width={size} height={size} >
    <defs>
      <clipPath id="circle">
        <circle cx={size/2} cy={size/2} r={size/2} />
      </clipPath>
      <filter id="turb">
        <feTurbulence baseFrequency="2" numOctaves="10" />
        <feDisplacementMap in="SourceGraphic" scale="20" />
      </filter>
    </defs>
    <g clipPath={clipPath}>
      {map(straightLines, ([translate, rotate], i) => (
        <line key={i} filter={filter} x1={-size} y1={-size} x2={1600} y2={1600} transform={`translate(${translate} ${translate}) rotate(${rotate})`} style={style} />
      ))}
      {times(0, i => (
        <path d={`M0 1600 C ${Math.random() * 800} ${Math.random() * 800}, ${Math.random() * 800} ${Math.random() * 800}, ${Math.random() * 800} ${Math.random() * 800}`} style={style} fill="transparent"/>
      ))}
    </g>
  </svg>
)

class LineInCircleContainer extends Component {
  state = {
    straightLines: times(numberOfLines, i => ([Math.random() * size, Math.random() * size]))
  }

  render() {
    return <LinesInCircle straightLines={this.state.straightLines} />
  }
}

export default LineInCircleContainer
