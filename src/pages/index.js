import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';
import Vis from '../components/Vis'

const talkData = require('../assets/data/talk-data.json')

function timeToMilliseconds(timeString) {
  let time = timeString.split(':');
  let minutes = (+time[0]) * 60 + (+time[1]);

  let milliseconds = minutes * 1000
  console.log(minutes);
  

  return milliseconds;
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
  background-color: transparent;
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
  width: 280px;
  box-shadow: 0 2px 34px 0 rgba(0,0,0,0.09),
    0 2px 6px 0 rgba(0,0,0,0.1);
  border-radius: 0px 6px 6px 6px;
  padding: 0;

`

const MetaContainer = styled.div`
  width: 100%;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;

  padding: 0.25rem 1.5rem;
  background-color: #f6f6f6;
  /* text-transform: uppercase; */
`

const TalkTitle = styled.p`
  font-size: 1rem;
  white-space: nowrap;
  /* font-family: "SFUIDisplay-Bold"; */
  /* font-weight: bold; */
  
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.p`
  font-size: 1rem;
  padding-left: 1.5rem;
  opacity: 0.4;
`;

const PreviewText = styled.p`
  line-height: 1.3;
  margin: 1rem 1.4rem;
  font-size: 1.2rem;
`;

const LinkText = styled.p`
  line-height: 1.3;
  margin: 1.5rem;
  font-size: 1.2rem;
  opacity: 0.4;
`;


class IndexPage extends React.PureComponent {
  state = {
    tedData: [],
    search: "applause",
    windowWidth: 1000,
    windowHeight: 1000,
    lineSpeaker: "",
    lineTitle: "",
    lineText: "",
    lineLink: "",
    lineTime: "",
    lineIndex: "",
    tooltipLeft: 0,
    tooltipRight: 0,
    tooltipOpen: false
  }

  dataLength = 1754;
  
  fetchSingle = (url) => {
    return new Promise(resolve => {
      const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
        "http://localhost:9000/" :
        "http://tedtalk.directory/.netlify/functions/";

        // const baseUrl = "http://tedtalk.directory/.netlify/functions/";

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



  handleTooltip = (e, time, text, index) => {
    let bounds = e.target.getBoundingClientRect();
    
    let searchIndex = text.toLowerCase().indexOf(this.state.search);
    
    let textSnippet = getClosestWord(text, searchIndex)

    const talkInfo = talkData.find(talk => talk.index === index);
    console.log(time);
    
    
    this.setState({
      lineIndex: index,
      lineText: textSnippet,
      lineTime: time,
      lineLink: talkInfo.url,
      lineTitle: talkInfo.talkTitle,
      tooltipOpen: true,
      tooltipLeft: bounds.left+bounds.height,
      tooltipTop: bounds.top+bounds.height
    })
  }

  closeTooltip = () => {
    this.setState({
      tooltipOpen: false,
      lineLink: "",
      lineTime: ""
    })
  }

  componentDidMount() {
    this.fetchTedData();
  }



  render() {
    const tooltipStyles = {
      top: this.state.tooltipTop,
      left: this.state.tooltipLeft,
      display: this.state.tooltipOpen ? "block" : "none"
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

        <InfoTooltip 
          innerRef={el => this.tooltip = el}
          style={tooltipStyles}
        > 
          <MetaContainer>
            <TalkTitle>{this.state.lineTitle}</TalkTitle>
            <Time>{this.state.lineTime}</Time>
          </MetaContainer>
          <PreviewText>{this.state.lineText}</PreviewText>
        </InfoTooltip>

        <a 
          href={this.state.tooltipOpen ? (this.state.lineLink + "#t-" + timeToMilliseconds(this.state.lineTime)) : "#"} 
          target={this.state.tooltipOpen ? "_blank" : ""}
        >
          <Vis 
            tedData={this.state.tedData} 
            talkData={talkData}
            handleTooltip={this.handleTooltip}
            handleMouseLeave={this.closeTooltip}
          />
        </a>

        {/* <Legend>
          <p>Talk Start {this.state.talkSpeaker}</p>
        </Legend> */}



        {/* <Legend>
          <p>Talk End</p>
        </Legend> */}
      </Container>
    )
  }
}

export default IndexPage
