import React, { Component } from 'react'
import { times, flatten, take } from 'lodash'

const width = 1000;
const height = 700;

const NUM_POINTS = 50

const randomFiftyPoints = () => times(NUM_POINTS, () => [Math.random() * width, Math.random() * height])

const style = {stroke:'grey',strokeWidth:0.5};

const connectLines = (points) => {
  return flatten(points.map(([x1, y1]) => (
    points.map(([x2, y2]) => [x1, y1, x2, y2])
  )))
}

const FiftyConnectedLines = ({ points, lines }) => (
  <svg width={width} height={height}>
    {points.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={1} fill='black' />
    ))}
    {lines.map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} style={style} />
    ))}
  </svg>
)

class FiftyConnectedLinesContainer extends Component {
  state = {
    points: randomFiftyPoints(),
    pointsRevealed: 0
  }

  componentDidMount() {
    this.animationInterval = window.setInterval(() => {
      if (this.state.pointsRevealed < NUM_POINTS)
        this.setState(({pointsRevealed}) => ({
          pointsRevealed: pointsRevealed + 1
        }))
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval)
  }

  render() {
    const points = take(this.state.points, this.state.pointsRevealed)
    const lines = connectLines(points)
    return <FiftyConnectedLines points={points} lines={lines} />
  }
}

export default FiftyConnectedLinesContainer
