import React from 'react'
import styled from 'styled-components';


function timeToMinutes(timeString) {
  let time = timeString.split(':');
  let minutes = (+time[0]) * 60 + (+time[1]);

  return minutes;
}


const TedVis = styled.svg`
  cursor: default;

  margin: 0;
  border-top: 1px solid rgba(0,0,0,0.1);

  circle {
    transform-origin: center center;
    transition: fill 150ms ease-out;
  }

  circle:hover {
    cursor: pointer;
    fill: #E62A01;
  }
`

export default class Vis extends React.Component {
  state = {
    windowWidth: 1000,
    windowHeight: 1000,
  }

  calcAspectRatio = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.setState({
      windowWidth: width,
      windowHeight: height
    })
  }

  componentDidMount() {
    this.calcAspectRatio();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tedData !== nextProps.tedData) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <TedVis xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.state.windowWidth} ${this.state.windowHeight * 0.9}`} preserveAspectRatio="xMinYMin meet">
        {this.props.tedData.map((talk, i) => {
          if (talk.foundLines.length <= 0)
            return <g key={i} />

          let height = timeToMinutes(talk.lastLine);



          return (
            <g key={i} transform={`translate(${this.state.windowWidth * 2 / this.props.tedData.length * i})`} fill="rgba(0,0,0, 0.2)">
              <line x1="0" y1="0" y2="500" x2="0" stroke="rgba(0,0,0, 0)" strokeWidth="0.1" />

              {talk.foundLines.map(({ time, text }, i) =>
                <React.Fragment key={i}>
                    <circle
                      cy={(timeToMinutes(time) / height * (this.state.windowHeight * 0.9 - 15)) + 10}
                      cx="0"
                      r="4"
                      onMouseEnter={(e) => this.props.handleTooltip(e, time, text, talk.index)}
                      onMouseLeave={() => this.props.handleMouseLeave()}
                    />
                </React.Fragment>
              )}
            </g>
          )
        })}
      </TedVis>
    )
  }
}