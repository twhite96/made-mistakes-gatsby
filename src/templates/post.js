import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Document from '../components/Document'
import CommentsList from '../components/Comments/CommentsList'
import CommentForm from '../components/Comments/CommentForm'
import Pagination from '../components/Pagination'
import site from '../../config/site'

import style from '../styles/post.module.css'

const PostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: {
      title,
      date,
      last_modified_at,
      path,
      image,
      excerpt,
      tags,
      toc,
      comments: commentsEnabled,
      comments_locked: commentsLocked,
    },
    excerpt: autoExcerpt,
    timeToRead,
    tableOfContents,
    id,
    html,
  } = data.markdownRemark
  const { comments } = data
  const { next, previous } = pageContext
  const metaImage = image ? image.childImageSharp.fixed : site.image
  const previousPath = previous && previous.frontmatter.path
  const previousLabel = previous && previous.frontmatter.title
  const nextPath = next && next.frontmatter.path
  const nextLabel = next && next.frontmatter.title

  return (
    <Layout>
      <SEO
        title={`${title} - ${site.titleAlt}`}
        path={path}
        datePublished={date}
        dateModified={last_modified_at}
        description={excerpt || autoExcerpt}
        metaImage={metaImage}
        article
      />
      <Document
        key={id}
        title={title}
        datePublished={date}
        dateModified={last_modified_at}
        path={path}
        author={site.author}
        timeToRead={timeToRead}
        toc={toc}
        tableOfContents={tableOfContents}
        image={image}
        html={html}
        tags={tags}
        previousPost={previous}
        nextPost={next}
      />
      <section className={style.comments}>
        {commentsEnabled && (
          <>
            {comments && <CommentsList commentsList={comments} />}
            {commentsLocked ? (
              <div className="custom-block notice">
                <div className="custom-block-heading">Comments are closed</div>
                <div className="custom-block-body">
                  If you have a question concerning the content of this page,
                  please feel free to contact me.
                </div>
              </div>
            ) : (
              <CommentForm slug={path} />
            )}
          </>
        )}
      </section>
      <Pagination
        previousPath={previousPath}
        previousLabel={previousLabel}
        nextPath={nextPath}
        nextLabel={nextLabel}
      />
    </Layout>
  )
}

export default PostTemplate

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date
        last_modified_at
        path
        author
        excerpt
        tags
        image {
          childImageSharp {
            fluid(
              maxWidth: 800
              quality: 75
              traceSVG: { background: "#fff", color: "#111" }
            ) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
            fixed(width: 1000, quality: 75) {
              src
              height
              width
            }
          }
        }
        toc
        comments
        comments_locked
      }
      id
      html
      excerpt
      timeToRead
      tableOfContents(pathToSlugField: "frontmatter.path", maxDepth: 3)
    }
    ...commentsQueryFragment
  }
`
