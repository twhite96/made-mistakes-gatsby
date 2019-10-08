import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { formatDistance } from 'date-fns'

import style from '../styles/Entry.module.css'

const _ = require('lodash-addons')

const Entry = ({
  title,
  date,
  path,
  image,
  author,
  timeToRead,
  excerpt,
  tags,
}) => {
  return (
    <>
      <article className={`${style.entry} h-entry`}>
        <h2 className={`${style.title} p-name`}>
          <Link to={path}>{title}</Link>
        </h2>
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
            <>
              {' '}
              <time className={`${style.date} dt-published`} dateTime={date}>
                {formatDistance(new Date(date), new Date(), {
                  addSuffix: true,
                })}
              </time>
            </>
          )}
          {timeToRead && (
            <>
              <span className={style.readTime}>
                {timeToRead}&nbsp;min&nbsp;read
              </span>
            </>
          )}
          {tags ? (
            <div className={style.tags}>
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
          className={`${style.excerpt} p-summary`}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </article>
    </>
  )
}

Entry.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.object,
  author: PropTypes.string,
  timeToRead: PropTypes.string,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
}

export default Entry
