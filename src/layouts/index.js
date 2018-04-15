import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import 'modern-normalize/modern-normalize.css'
import './index.css'

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