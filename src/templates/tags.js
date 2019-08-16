import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import site from '../../config/site'

import '../styles/layout.css'

const _ = require('lodash')

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
    allMarkdownRemark: { edges: posts },
  } = data
  const paginationTitle =
    humanPageNumber === 1
      ? ''
      : ` - Page ${humanPageNumber} of ${numberOfPages}`
  const metaImage = site.image

  return (
    <>
      <SEO
        title={`${tag}${paginationTitle} - ${site.title}`}
        path={`/tag/${_.kebabCase(tag)}/`}
        description={site.description}
        metaImage={metaImage}
      />
      <Layout>
        <div className="infoBanner">
          Posts with tag: <span>#{tag}</span>
        </div>

        {posts.map(({ node }) => {
          const {
            id,
            excerpt: autoExcerpt,
            frontmatter: { title, date, path, author, image, excerpt, tags },
          } = node

          return (
            <Post
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
    </>
  )
}

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
