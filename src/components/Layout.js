import React from 'react'
import PropTypes from 'prop-types'
import useSiteMetadata from './useSiteMetadata'

import Header from './Header'
import Footer from './Footer'

import '../styles/Layout.module.css'
import style from '../styles/Grid.module.css'

const Layout = ({ children }) => {
  const {
    title,
    defaultTheme,
    mainMenu,
    footerMenu,
    menuMoreText,
    twitterUrl,
    githubUrl,
    instagramUrl,
    feedUrl,
    copyrights,
  } = useSiteMetadata()

  return (
    <div className={style.wrapper}>
      <Header
        siteTitle={title}
        defaultTheme={defaultTheme}
        mainMenu={mainMenu}
        menuMoreText={menuMoreText}
      />
      {children}
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
