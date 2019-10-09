import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from './Icon'

import style from '../styles/Menu.module.css'

const MainMenu = ({ mainMenu, mainMenuItems, isMobileMenu }) => {
  const menu = mainMenu.slice(0)
  !isMobileMenu && menu.splice(mainMenuItems)

  return menu.map((menuItem, index) => (
    <li key={index} className={style.primaryMenuItem}>
      <Link to={menuItem.path} itemProp="url">
        {menuItem.title}
      </Link>
    </li>
  ))
}

const SubMenu = ({ mainMenu, mainMenuItems, onToggleSubMenu }) => {
  const menu = mainMenu.slice(0)
  menu.splice(0, mainMenuItems)

  const items = menu.map((menuItem, index) => (
    <li key={index} className={style.secondaryMenuItem}>
      <Link to={menuItem.path} itemProp="url">
        {menuItem.title}
      </Link>
    </li>
  ))

  return (
    <>
      {items}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={style.subMenuOverlay}
        role="button"
        tabIndex={-1}
        onClick={onToggleSubMenu}
      />
    </>
  )
}

const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`

const Menu = ({
  mainMenu,
  mainMenuItems,
  menuMoreText,
  isSubMenuVisible,
  onToggleSubMenu,
  onChangeTheme,
}) => {
  const isSubMenu = !(mainMenuItems >= mainMenu.length) && mainMenuItems > 0

  return (
    <>
      <nav
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
        aria-label="Primary navigation"
        className={style.primaryNavigation}
      >
        <ul className={style.primaryMenu}>
          <MainMenu mainMenu={mainMenu} mainMenuItems={mainMenuItems} />
        </ul>
      </nav>
      {isSubMenu ? (
        <>
          <button
            className={style.subMenuTrigger}
            onClick={onToggleSubMenu}
            type="button"
            aria-label="Menu"
          >
            {menuMoreText || 'Menu'}
          </button>
          <nav
            itemScope
            itemType="http://schema.org/SiteNavigationElement"
            aria-label="Secondary navigation"
            className={
              isSubMenuVisible
                ? style.secondaryNavigationIsVisible
                : style.secondaryNavigation
            }
          >
            <ul className={style.secondaryMenu}>
              <SubMenu
                mainMenu={mainMenu}
                mainMenuItems={mainMenuItems}
                onToggleSubMenu={onToggleSubMenu}
              />
            </ul>
          </nav>
        </>
      ) : null}
      <button
        className={style.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon style={{ cursor: 'pointer' }} size={24} d={toggleIcon} />
      </button>
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
  mainMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
  isSubMenuVisible: PropTypes.bool,
  onToggleSubMenu: PropTypes.func,
  onChangeTheme: PropTypes.func,
}

SubMenu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  mainMenuItems: PropTypes.number,
  onToggleSubMenu: PropTypes.func,
}

export default Menu
