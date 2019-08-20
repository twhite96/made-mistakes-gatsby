import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import site from '../../config/site'

const Index = ({
  data,
  pageContext: {
    nextPagePath,
    previousPagePath,
    humanPageNumber,
    numberOfPages,
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
        title={`${site.title}${paginationTitle}`}
        path="/"
        description={site.description}
        metaImage={metaImage}
      />
      <Layout>
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
              image={image}
              tags={tags}
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

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
    humanPageNumber: PropTypes.number,
    numberOfPages: PropTypes.number,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts//" } }
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

export default Index
