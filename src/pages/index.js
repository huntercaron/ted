import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';


function timeToMinutes(timeString) {
  let time = timeString.split(':');
  let minutes = (+time[0]) * 60 + (+time[1]);

  return minutes;
}

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
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 70%;
  height: 40px;
  font-size: 1.6rem;
  margin-top: 8px;
  padding-left: 22px;
      font-family: monospace !important;
      text-align: right;
    border-bottom: 1px solid #aaa;
  font-family: sans-serif;

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
    margin-top: 8px;
  border-bottom: black;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,0,0,0);
  

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
  }

  circle:hover {
    
    
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


class IndexPage extends React.Component {
  state = {
    tedData: [],
    search: "",
    talkSpeaker: "",
    windowWidth: 1000,
    windowHeight: 1000
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

      console.log(talks.length);

      scope.setState({
        tedData: talks
      })
    })
  }

  updateSearchTerm = (e) => {
    e.preventDefault();

    this.fetchTedData(this.searchInput.value.toLowerCase());

    this.searchInput.blur()
    this.searchInput.value = "";

    this.setState({
      imageMode: true
    })
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
    this.fetchTedData();
    this.calcAspectRatio();
  }



  render() {
    return (
      <div>

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

        {/* <Legend>
          <p>Talk Start {this.state.talkSpeaker}</p>
        </Legend> */}

        <TedVis xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.state.windowWidth} ${this.state.windowHeight*0.9}`} preserveAspectRatio="xMinYMin meet">
          {this.state.tedData.map((talk, i) => {
            if (talk.foundLines.length <= 0)
              return <g key={i}/>

            let height = timeToMinutes(talk.lastLine);

            return (
              <g key={i} transform={`translate(${this.state.windowWidth*2/this.state.tedData.length*i})`} fill="rgba(0, 50, 0, 0.6)">
                <line x1="0" y1="0" y2="500" x2="0" stroke="rgba(0,0,0, 0)" strokeWidth="0.1" />
                
                {talk.foundLines.map((line,i) => 
                  <React.Fragment key={i}>
                    <circle cy={(timeToMinutes(line) / height * this.state.windowHeight * 0.9) + 0} cx="0" r="2.5"/>
                  </React.Fragment>
                )}
              </g>
            )
          })}
        </TedVis>

        {/* <Legend>
          <p>Talk End</p>
        </Legend> */}
      </div>
    )
  }
}

export default IndexPage
