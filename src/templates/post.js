import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Document from '../components/document'
import Comments from '../components/comments'
import CommentsForm from '../components/commentsform'
import site from '../../config/site'

const PostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: {
      title,
      date,
      last_modified_at,
      path,
      author,
      image,
      excerpt,
      tags,
    },
    excerpt: autoExcerpt,
    id,
    html,
  } = data.markdownRemark
  const { comments } = data
  const { next, previous } = pageContext
  const metaImage = image ? image.childImageSharp.fixed : site.image
  // const previousPath = previous && previous.frontmatter.path
  // const previousLabel = previous && previous.frontmatter.title
  // const nextPath = next && next.frontmatter.path
  // const nextLabel = next && next.frontmatter.title

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
        date={date}
        path={path}
        author={author}
        image={image}
        html={html}
        tags={tags}
        previousPost={previous}
        nextPost={next}
      />
      <Comments comments={comments} />
      <CommentsForm slug={path} />
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
        date(formatString: "MMMM DD, YYYY")
        last_modified_at(formatString: "MMMM DD, YYYY")
        path
        author
        excerpt
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1000) {
              src
              height
              width
            }
          }
        }
      }
      id
      html
      excerpt
    }
    ...commentsQueryFragment
  }
`
