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
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 70%;
  height: 50px;
  font-size: 1.6rem;
  padding-left: 22px;
      font-family: monospace !important;
      text-align: right;
    border-bottom: 1px solid #aaa;
  font-family: sans-serif;

  transition: all 200ms ease-out;
`

const SubmitArrow = styled.div`
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
  

  &:hover {
    border-bottom: 1px solid black;
  }


  &:active {
    background-color: #eee;
  }
`

const TedVis = styled.svg`
  width: 98%;
  margin: 0 1%;

  circle {
    transform-origin: center center;
  }

  circle:hover {
    transform: scale(4);
    
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
    search: ""
  }

  fetchTedData = (term = "applause") => {
    let searchTerm = term;
    let scope = this;

    console.log(searchTerm);

    // fetch(`http://localhost:3000/ted/search/${searchTerm}`)
    fetch(`http://tedtalk.directory/.netlify/functions/get-ted?search=${searchTerm}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        scope.setState({
          tedData: data
        })
      });
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

  componentDidMount() {
    this.fetchTedData();
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

          <SubmitArrow submitted={this.state.imageMode}>
            in a Ted Talk &rarr;
          </SubmitArrow>
        </InputContainer>

        <Legend>
          <p>Talk Start</p>
        </Legend>

        <TedVis xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1010 500">
          {this.state.tedData.map((talk, i) => {
            if (talk.foundLines.length <= 0)
              return <g key={i}/>

            let width = timeToMinutes(talk.lastLine);

            return (
              <g key={i} transform={`translate(${1000/this.state.tedData.length*i})`} fill="rgba(0, 50, 0, 0.6)">
                <line x1="0" y1="0" y2="500" x2="0" stroke="rgba(0,0,0, 0)" strokeWidth="0.1" />
                
                {talk.foundLines.map((line,i) => 
                  <React.Fragment key={i}>
                    <circle cy={(timeToMinutes(line) / width * 500) + 0} cx="0" r="2"/>
                  </React.Fragment>
                )}
              </g>
            )
          })}
        </TedVis>

        <Legend>
          <p>Talk End</p>
        </Legend>
      </div>
    )
  }
}

export default IndexPage
