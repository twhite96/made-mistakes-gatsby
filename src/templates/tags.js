import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Document from '../components/Document'
import Navigation from '../components/Navigation'

import site from '../../config/site'

const _ = require('lodash-addons')

const Tags = ({
  data,
  pageContext: {
    nextPagePath,
    previousPagePath,
    humanPageNumber,
    numberOfPages,
    tag,
  },
}) => {
  const {
    taxonomyYaml: { excerpt: taxonomyExcerpt, html: taxonomyHtml },
    allMarkdownRemark: { edges: posts },
  } = data
  const paginationTitle =
    humanPageNumber === 1
      ? ''
      : ` - Page ${humanPageNumber} of ${numberOfPages}`
  const metaImage = site.image

  return (
    <Layout>
      <SEO
        title={`${tag}${paginationTitle} - ${site.title}`}
        path={`/tag/${_.slugify(tag)}/`}
        description={
          taxonomyExcerpt || `An archive of posts related to ${tag}.`
        }
        metaImage={metaImage}
      />

      <h1>
        #{tag} {paginationTitle}
      </h1>
      {taxonomyHtml && humanPageNumber === 1 && (
        <div dangerouslySetInnerHTML={{ __html: taxonomyHtml }} />
      )}

      {posts.map(({ node }) => {
        const {
          id,
          excerpt: autoExcerpt,
          frontmatter: { title, date, path, author, image, excerpt, tags },
        } = node

        return (
          <Document
            key={id}
            title={title}
            date={date}
            path={path}
            author={author}
            tags={tags}
            image={image}
            excerpt={excerpt || autoExcerpt}
          />
        )
      })}

      <Navigation
        previousPath={previousPagePath}
        previousLabel="Newer posts"
        nextPath={nextPagePath}
        nextLabel="Older posts"
      />
    </Layout>
  )
}

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
    humanPageNumber: PropTypes.number,
    numberOfPages: PropTypes.number,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $tag: String!) {
    taxonomyYaml(id: { eq: $tag }) {
      id
      excerpt
      html
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] }, published: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            author
            excerpt
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Tags
