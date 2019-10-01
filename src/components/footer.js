import React from 'react'
import PropTypes from 'prop-types'

import style from '../styles/Footer.module.css'

const Footer = ({ copyrights }) => (
  <footer className={style.footer}>
    <ul className={style.menu} />
    {copyrights && (
      <div
        className={style.copyright}
        dangerouslySetInnerHTML={{
          __html: copyrights,
        }}
      />
    )}
  </footer>
)

Footer.propTypes = {
  copyrights: PropTypes.string,
}

export default Footer
