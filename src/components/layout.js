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
          twitterUrl
          githubUrl
          instagramUrl
          feedUrl
          copyrights
          mainMenu {
            title
            path
          }
          footerMenu {
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
    footerMenu,
    showMenuItems,
    menuMoreText,
    twitterUrl,
    githubUrl,
    instagramUrl,
    feedUrl,
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
      <Footer
        footerMenu={footerMenu}
        twitter={twitterUrl}
        github={githubUrl}
        instagram={instagramUrl}
        feed={feedUrl}
        copyrights={copyrights}
      />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
