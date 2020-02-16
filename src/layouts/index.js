import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'modern-normalize/modern-normalize.css'
import './index.css'

/*
  Layout File
  this file is the base of every page
  useful for headers & navs

  this is where global styles/font loading lives
*/

// page component
const TemplateWrapper = ({ children }) => (
  <>
    <Helmet>
      <title>Ted</title>
    </Helmet>

    {children}
  </>
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
