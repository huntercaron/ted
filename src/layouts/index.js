import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
// import 'modern-normalize/modern-normalize.css'

// importing fonts
import UnrealBoldwoff from "../assets/fonts/Unreal-Bold.woff"
import UnrealBoldwoff2 from "../assets/fonts/Unreal-Bold.woff2"


/*
  Layout File
  this file is the base of every page
  useful for headers & navs

  this is where global styles/font loading lives
*/


// styled components
const Container = styled.div`
  height: 100%;
`

const TitleLink = styled(Link) `
  color: white;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
`

const HeaderContainer = styled.div`

`

// page component
const TemplateWrapper = ({ children }) => (
  <React.Fragment>
    <Helmet
      title="Ted"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />

    {children()}

  </React.Fragment>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper


/* Global Site Styles
 * used for importing fonts and setting up sizes
 * also for default values
 * avoid using for anything else
 */
injectGlobal`
  html {
  ${'' /* Maybe Try?  font-size: calc(1.25vw + 62.5%); */}
    font-size: 62.5%;
    height: 100%;
  }

  body {
      margin: 0;
      height: 100%;
      
      font-size: 1.6em;
      line-height: 1.6;
      font-weight: 400;
      font-family: monospace;
      color: black;
      background-color: white;
      webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
  }

  #___gatsby {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-family: monospace;
    margin-top: 0;
    margin-bottom: 0rem;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Unreal';
    src: url(${UnrealBoldwoff});
    src: url(${UnrealBoldwoff}) format('woff'),
         url(${UnrealBoldwoff2}) format('woff2');
    font-weight: bold;
    font-style: normal;
  }
`
