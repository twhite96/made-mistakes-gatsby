import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { formatDistance } from 'date-fns'

import style from '../styles/Document.module.css'

const _ = require('lodash-addons')

const Document = ({ title, date, image, author, timeToRead, tags, html }) => {
  return (
    <>
      <article className={`${style.document} h-entry`}>
        <div className={style.title}>
          <h1 className={`${style.heading} p-name`}>
            <span>{title}</span>
          </h1>
        </div>
        <div className={style.meta}>
          {author && (
            <span style={{ display: 'none' }}>
              Published by{' '}
              <a className="p-author h-card" href={author.url}>
                {author.name}
              </a>
            </span>
          )}
          {date && (
            <span className={style.date}>
              {' '}
              <time className="dt-published" dateTime={date}>
                {formatDistance(new Date(date), new Date(), {
                  addSuffix: true,
                })}
              </time>
            </span>
          )}
          {timeToRead && (
            <span className={style.readTime}>
              {timeToRead}&nbsp;min&nbsp;read
            </span>
          )}
          {tags ? (
            <div>
              {tags.map(tag => (
                <Link to={`/tag/${_.slugify(tag)}/`} key={_.slugify(tag)}>
                  <span>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {image && (
          <Img fluid={image.childImageSharp.fluid} className={style.cover} />
        )}

        <div
          className={`${style.content} e-content`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  )
}

Document.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.object,
  author: PropTypes.object,
  timeToRead: PropTypes.number,
  html: PropTypes.string,
  tags: PropTypes.array,
}

export default Document
