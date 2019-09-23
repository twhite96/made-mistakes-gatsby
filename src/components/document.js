import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { formatDistance } from 'date-fns'

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
    <>
      <article className={`h-entry ${style.post}`}>
        <div className={style.postContent}>
          {excerpt ? (
            <h2 className={`p-name ${style.title}`}>
              <Link to={path}>{title}</Link>
            </h2>
          ) : (
            <h1 className={`p-name ${style.title}`}>{title}</h1>
          )}
          <div className={style.meta}>
            {author && (
              <>
                Published by{' '}
                <a className="p-author h-card" href={author.url}>
                  {author.name}
                </a>
              </>
            )}
            {date && (
              <>
                {' '}
                <time className="dt-published" dateTime={date}>
                  {formatDistance(new Date(date), new Date(), {
                    addSuffix: true,
                  })}
                </time>
              </>
            )}
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
              <p className="p-summary">{excerpt}</p>
              <Link to={path} className={style.readMore}>
                Read more →
              </Link>
            </>
          ) : (
            <>
              <div
                className="e-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </>
          )}
        </div>
      </article>
    </>
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
