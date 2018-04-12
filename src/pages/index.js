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
    top: 0;
`;

const SearchInput = styled.input`
  outline: none;
  border-radius: 50px;
  border: 1.5px solid black;
  width: 70%;
  height: 50px;
  font-size: 1.6rem;
  padding-left: 22px;
  font-family: sans-serif;

  transition: all 200ms ease-out;
`

const SubmitArrow = styled.button`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background: none;
  border-radius: 50%;
  margin: 0 0.5rem;

  svg {
    transition: opacity 150ms ease-out;
    opacity: 1;
  }
  
  width: 50px;
  height: 50px;

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

  circle
`

const TalkCircle = styled.circle`
  &:hover {
    transform: scale(4);
    opacity: 0;
  }
`

const Legend = styled.div`
  display: flex;
  justify-content: space-between;
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
    

    fetch(`http://localhost:3000/ted/search/${searchTerm}`)
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
        <Heading>TED</Heading>

        <InputContainer onSubmit={this.updateSearchTerm}>
          <SearchInput
            type="text"
            innerRef={input => this.searchInput = input}
            placeholder="Search" 
          />

          <SubmitArrow submitted={this.state.imageMode}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 11">
              <polygon fill="#000000" fillRule="evenodd" points="8.81 .647 13.655 5.492 13.655 5.934 8.81 10.779 7.824 9.793 11.258 6.393 .684 6.393 .684 5.05 11.275 5.05 7.824 1.633" />
            </svg>
          </SubmitArrow>
        </InputContainer>

        <Legend>
          <p>Talk Start</p>
          <p>Talk End</p>
        </Legend>

        <TedVis xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1010 10505">
          {this.state.tedData.map((talk, i) => {
            if (talk.foundLines.length <= 0)
              return <g key={i}/>

            let width = timeToMinutes(talk.lastLine);

            return (
              <g key={i} transform={`translate(5, ${10500 / this.state.tedData.length * i + 5})`} fill="rgba(255, 50, 0, 0.6)">
                <line x1="0" y1="0" y2="0" x2="1000" stroke="rgba(0,0,0, 0)" strokeWidth="1" />
                
                {talk.foundLines.map((line,i) => 
                  <React.Fragment key={i}>
                    <circle cy="0" cx={timeToMinutes(line)/width * 1000} r="2"/>
                  </React.Fragment>
                )}
              </g>
            )
          })}
        </TedVis>

      </div>
    )
  }
}

export default IndexPage
