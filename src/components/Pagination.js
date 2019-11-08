import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import style from '../styles/Pagination.module.css'

const Pagination = ({ nextPath, previousPath, nextLabel, previousLabel }) =>
  previousPath || nextPath ? (
    <nav className={style.pagination}>
      {previousPath && (
        <Link to={previousPath} className={style.item}>
          <span className={style.iconPrev}>←</span>
          <span className={style.itemText}>
            <strong className={style.itemLabel}>Previous</strong>{' '}
            {previousLabel}
          </span>
        </Link>
      )}
      {nextPath && (
        <Link to={nextPath} className={`${style.item} ${style.itemRight}`}>
          <span className={style.itemText}>
            <strong className={style.itemLabel}>Next</strong> {nextLabel}
          </span>
          <span className={style.iconNext}>→</span>
        </Link>
      )}
    </nav>
  ) : null

Pagination.propTypes = {
  nextPath: PropTypes.string,
  previousPath: PropTypes.string,
  nextLabel: PropTypes.string,
  previousLabel: PropTypes.string,
}

export default Pagination
