import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { formatDistance } from 'date-fns'

import style from '../styles/Document.module.css'

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
      <article className="h-entry">
        <div>
          {excerpt ? (
            <h2 className="p-name">
              <Link to={path}>{title}</Link>
            </h2>
          ) : (
            <h1 className="p-name">{title}</h1>
          )}
          <div>
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
              <div>
                {tags.map(tag => (
                  <Link to={`/tag/${_.slugify(tag)}/`} key={_.slugify(tag)}>
                    <span>#{tag}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {image && <Img fluid={image.childImageSharp.fluid} />}

          {excerpt ? (
            <>
              <p className="p-summary">{excerpt}</p>
              <Link to={path}>Read more →</Link>
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
