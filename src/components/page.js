import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import style from '../styles/post.module.css'

const Page = ({ title, path, image, excerpt, html }) => {
  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h1 className={style.title}>
          {excerpt ? <Link to={path}>{title}</Link> : title}
        </h1>

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

Page.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.object,
  excerpt: PropTypes.string,
  html: PropTypes.string
}

export default Page
