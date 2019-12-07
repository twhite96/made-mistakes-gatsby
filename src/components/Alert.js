import React from 'react'
import PropTypes from 'prop-types'

import style from '../styles/Alert.module.css'

const Alert = props => {
  const { type, title, content } = props

  return (
    <div className={`${style.alert} ${style[type]}`}>
      {title && <div className={style.title}>{title}</div>}
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
}
Alert.defaultProps = {
  type: 'alert',
}

export default Alert
