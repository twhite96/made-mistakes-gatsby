import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Gravatar from 'react-gravatar'

import style from '../../styles/Comment.module.css'

const Comment = props => {
  const { name, email, friendlyDate, iso8601Date, children } = props

  return (
    <div className={style.comment}>
      <div className={style.avatar}>
        <Gravatar
          size={60}
          md5={email}
          email={name}
          default="mm"
          rating="pg"
          loading="lazy"
        />
      </div>
      <div className={style.main}>
        <header className={style.meta}>
          <strong className={`${style.name} "h-card"`}>{name}</strong> on{' '}
          <time dateTime={iso8601Date}>{friendlyDate}</time>
        </header>
        <div className={style.message}>{children}</div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  friendlyDate: PropTypes.string.isRequired,
  iso8601Date: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Comment

export const commentQuery = graphql`
  fragment commentAttributesFragment on MarkdownRemark {
    id
    frontmatter {
      name
      email
      friendlyDate: date(formatString: "MMMM DD, YYYY")
      iso8601Date: date
      published
    }
    html
  }
`
