import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const talkData = require('../assets/data/talk-data.json')
console.log(talkData);



function timeToMinutes(timeString) {
  let time = timeString.split(':');
  let minutes = (+time[0]) * 60 + (+time[1]);

  return minutes;
}

function getClosestWord(str, pos) {
  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;

  // Search for the word's beginning and end.
  let left = str.slice(0, pos + 1).lastIndexOf('.')+1
  let right = str.slice(pos).search(/[.?!]/)+1;

  // The last word in the string is a special case.
  if (right < 1) {
    return str.slice(left);
  }
  // Return the word, using the located bounds to extract it from the string.
  return str.slice(left, right + pos);
}



const Container = styled.div`
  background-color: white;
`

const Heading = styled.h1`
  font-size: 32vw;
  text-align: center;
  line-height: 1;
  margin: 4rem 0 0 0;
`;

const InputContainer = styled.form`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    position: sticky;
    z-index: 4;
    top: 0;
    height: 10vh;
    background-color: #EEE;

`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 70%;
  height: 40px;
  font-size: 1.6rem;
  padding-left: 22px;
  font-family: monospace !important;
  text-align: right;
  border-bottom: 1px solid #aaa;
  font-family: sans-serif;
  background-color: #EEE;
  margin-top: 4px;

  transition: all 200ms ease-out;
`

const SubmitArrow = styled.button`
  height: 40px;
  padding: 1rem;

  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background: none;
  margin: 0 0.5rem;
  border-bottom: black;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,0,0,0);
  margin-top: 4px;

  &:hover {
    border-bottom: 1px solid black;
  }


  &:active {
    background-color: #eee;
  }
`

const TedVis = styled.svg`

  margin: 0;
  border-top: 1px solid rgba(0,0,0,0.1);

  circle {
    transform-origin: center center;
    transition: fill 150ms ease-out;
  }

  circle:hover {
    
    fill: #E62A01;
  }
`

const Legend = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 2rem;
  padding: 0 0.5rem;
`

const InfoTooltip = styled.div`
  position: absolute;
  min-height: 80px;
  background-color: white;
  width: 200px;
  box-shadow: 0 2px 34px 0 rgba(0,0,0,0.09);
`


class IndexPage extends React.PureComponent {
  state = {
    tedData: [],
    search: "applause",
    windowWidth: 1000,
    windowHeight: 1000,
    lineSpeaker: "",
    lineText: "",
    lineLink: "",
    lineTime: "",
    lineIndex: "",
    posLeft: 0,
    posRight: 0
  }

  dataLength = 1754;
  
  fetchSingle = (url) => {
    return new Promise(resolve => {
      const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
        "http://localhost:9000/" :
        "http://tedtalk.directory/.netlify/functions/";

      fetch(baseUrl + url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          resolve(data);
        });
    })

  }

  fetchTedData = (term = "applause") => {
    let searchTerm = term;
    let scope = this;
    let talkRequests = [];

    for (let i = 1; i <= 5; i++) {
      talkRequests.push(this.fetchSingle(`ted-section-${i}?search=${searchTerm}`));
    } 
    
    Promise.all(talkRequests).then(files => {
      const talks = [].concat(...files);

      scope.setState({
        tedData: talks
      })
    })
  }

  updateSearchTerm = (e) => {
    e.preventDefault();
    let search = this.searchInput.value.toLowerCase();

    this.fetchTedData(search);

    this.setState({
      imageMode: true,
      search: search
    })

    this.searchInput.blur()
    this.searchInput.value = "";
  }

  calcAspectRatio = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.setState({
      windowWidth: width,
      windowHeight: height
    })
  }

  setTooltipInfo = (time, text, index) => {
    let searchIndex = text.toLowerCase().indexOf(this.state.search);
    console.log(searchIndex);
    
    let textSnippet = getClosestWord(text, searchIndex)
    
    if (this.state.lineIndex !== index) {
      this.setState({
        lineIndex: index,
        lineText: textSnippet,
        lineTime: time,
      })
    } else {
      this.setState({
        lineText: textSnippet,
        lineTime: time
      })
    }
  }

  componentDidMount() {
    this.fetchTedData();
    this.calcAspectRatio();
  }



  render() {
    const tooltipStyles = {
      top: 0,
      left: 0
    }

    return (
      <Container>

        <InputContainer onSubmit={this.updateSearchTerm}>
          <SearchInput
            type="text"
            innerRef={input => this.searchInput = input}
            placeholder="Search for (Applause)" 
          />

          <SubmitArrow submitted={this.state.imageMode} type="submit">
            in a Ted Talk &rarr;
          </SubmitArrow>
        </InputContainer>

        <InfoTooltip innerRef={el => this.tooltip = el}>
          {this.state.lineTime}
          <p>{this.state.lineText}</p>
        </InfoTooltip>

        {/* <Legend>
          <p>Talk Start {this.state.talkSpeaker}</p>
        </Legend> */}

        <TedVis xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.state.windowWidth} ${this.state.windowHeight*0.9}`} preserveAspectRatio="xMinYMin meet">
          {this.state.tedData.map((talk, i) => {
            if (talk.foundLines.length <= 0)
              return <g key={i}/>

            let height = timeToMinutes(talk.lastLine);

            return (
              <g key={i} transform={`translate(${this.state.windowWidth*2/this.state.tedData.length*i})`} fill="rgba(0,0,0, 0.2)">
                <line x1="0" y1="0" y2="500" x2="0" stroke="rgba(0,0,0, 0)" strokeWidth="0.1" />
                
                {talk.foundLines.map(({ time, text },i) => 
                  <React.Fragment key={i}>
                    <circle
                      cy={(timeToMinutes(time) / height * (this.state.windowHeight * 0.9 - 15)) + 10} 
                      cx="0" 
                      r="4"
                      onMouseEnter={() => this.setTooltipInfo(time, text, talk.index)}
                    />
                  </React.Fragment>
                )}
              </g>
            )
          })}
        </TedVis>

        {/* <Legend>
          <p>Talk End</p>
        </Legend> */}
      </Container>
    )
  }
}

export default IndexPage
