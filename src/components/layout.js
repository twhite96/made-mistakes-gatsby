import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Footer from './Footer'

import '../styles/Layout.module.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          defaultTheme
          copyrights
          mainMenu {
            title
            path
          }
          showMenuItems
          menuMoreText
        }
      }
    }
  `)
  const {
    title,
    defaultTheme,
    mainMenu,
    showMenuItems,
    menuMoreText,
    copyrights,
  } = data.site.siteMetadata

  return (
    <div>
      <Header
        siteTitle={title}
        defaultTheme={defaultTheme}
        mainMenu={mainMenu}
        mainMenuItems={showMenuItems}
        menuMoreText={menuMoreText}
      />
      <main>{children}</main>
      <Footer copyrights={copyrights} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
