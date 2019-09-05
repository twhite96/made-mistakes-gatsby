import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import style from '../styles/post.module.css'

const _ = require('lodash-addons')

const Document = ({
  title,
  date,
  path,
  image,
  author,
  excerpt,
  tags,
  html,
}) => {
  return (
    <div className={style.post}>
      <div className={style.postContent}>
        {excerpt ? (
          <h2 className={style.title}>
            <Link to={path}>{title}</Link>
          </h2>
        ) : (
          <h1 className={style.title}>{title}</h1>
        )}
        <div className={style.meta}>
          {date} {author && <>— Written by {author}</>}
          {tags ? (
            <div className={style.tags}>
              {tags.map(tag => (
                <Link to={`/tag/${_.slugify(tag)}/`} key={_.slugify(tag)}>
                  <span className={style.tag}>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {image && (
          <Img
            fluid={image.childImageSharp.fluid}
            className={style.coverImage}
          />
        )}

        {excerpt ? (
          <>
            <p>{excerpt}</p>
            <Link to={path} className={style.readMore}>
              Read more →
            </Link>
          </>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </>
        )}
      </div>
    </div>
  )
}

Document.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.object,
  author: PropTypes.string,
  excerpt: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.array,
}

export default Document
