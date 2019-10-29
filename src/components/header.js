import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Menu from './Menu'

import style from '../styles/Header.module.css'

const Header = props => {
  const { siteTitle, mainMenu, menuMoreText, defaultTheme } = props
  const defaultThemeState =
    (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
    null
  const [userTheme, changeTheme] = useState(defaultThemeState)
  const [isMenuVisible, toggleMenu] = useState(false)
  const onChangeTheme = () => {
    const alternateTheme =
      (userTheme || defaultTheme) === 'light' ? 'dark' : 'light'

    changeTheme(alternateTheme)

    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', alternateTheme)
  }
  const onToggleMenu = () => toggleMenu(!isMenuVisible)

  return (
    <>
      <Helmet>
        <body
          className={`${
            (userTheme || defaultTheme) === 'light'
              ? 'light-theme'
              : 'dark-theme'
          } ${isMenuVisible ? 'menu-open' : 'menu-closed'}`}
        />
      </Helmet>
      <header className={style.header}>
        <div className={style.name}>
          <Link to="/">{siteTitle}</Link>
        </div>
        <Menu
          mainMenu={mainMenu}
          isMenuVisible={isMenuVisible}
          menuMoreText={menuMoreText}
          onToggleMenu={onToggleMenu}
          onChangeTheme={onChangeTheme}
        />
      </header>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  defaultTheme: PropTypes.string,
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  menuMoreText: PropTypes.string,
}

export default Header
