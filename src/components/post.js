import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Navigation from './navigation'
import Comments from './comments'

import style from '../styles/post.module.css'

const _ = require('lodash-addons')

const Post = ({
  title,
  date,
  path,
  image,
  author,
  excerpt,
  tags,
  html,
  comments,
  previousPost,
  nextPost,
}) => {
  const previousPath = previousPost && previousPost.frontmatter.path
  const previousLabel = previousPost && previousPost.frontmatter.title
  const nextPath = nextPost && nextPost.frontmatter.path
  const nextLabel = nextPost && nextPost.frontmatter.title

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
            <Comments comments={comments} />
            <Navigation
              previousPath={previousPath}
              previousLabel={previousLabel}
              nextPath={nextPath}
              nextLabel={nextLabel}
            />
          </>
        )}
      </div>
    </div>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.object,
  author: PropTypes.string,
  excerpt: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.array,
  previousPost: PropTypes.object,
  nextPost: PropTypes.object,
}

export default Post
