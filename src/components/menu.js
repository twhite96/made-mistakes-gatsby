import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Icon from './Icon'

import style from '../styles/Menu.module.css'

const MainMenu = ({ mainMenu }) => {
  const menu = mainMenu.slice(0)

  const items = menu.map((menuItem, index) => (
    <li key={index} className={style.primaryMenuItem}>
      <Link to={menuItem.path} itemProp="url">
        {menuItem.title}
      </Link>
    </li>
  ))

  return <ul className={style.primaryMenu}>{items}</ul>
}

const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`

const Menu = ({
  mainMenu,
  menuMoreText,
  isMenuVisible,
  onToggleMenu,
  onChangeTheme,
}) => {
  return (
    <>
      <nav
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
        aria-label="Primary navigation"
        className={
          isMenuVisible
            ? style.primaryNavigationIsVisible
            : style.primaryNavigation
        }
      >
        <MainMenu mainMenu={mainMenu} />
      </nav>
      <div className={style.siteControls}>
        <button
          className={style.menuToggle}
          onClick={onToggleMenu}
          type="button"
          aria-label="Menu"
        >
          {menuMoreText}
        </button>
        <button
          className={style.themeToggle}
          onClick={onChangeTheme}
          type="button"
          aria-label="Theme toggle"
        >
          <Icon style={{ cursor: 'pointer' }} size={24} d={toggleIcon} />
        </button>
      </div>
    </>
  )
}

Menu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  menuMoreText: PropTypes.string,
  isMenuVisible: PropTypes.bool,
  onToggleMenu: PropTypes.func,
  onChangeTheme: PropTypes.func,
}

export default Menu
