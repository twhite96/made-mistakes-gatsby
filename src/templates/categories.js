import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Entry from '../components/Entry'
import Pagination from '../components/Pagination'

import site from '../../config/site'

import style from '../styles/Archive.module.css'

const _ = require('lodash-addons')

const Categories = ({
  data,
  pageContext: {
    nextPagePath,
    previousPagePath,
    humanPageNumber,
    numberOfPages,
    category,
  },
}) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    taxonomyYaml: {
      name: taxonomyName,
      excerpt: taxonomyExcerpt,
      html: taxonomyHtml,
    },
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
        title={`${taxonomyName}${paginationTitle} - ${site.title}`}
        path={`/${_.slugify(category)}/`}
        description={
          taxonomyExcerpt || `An archive of posts related to ${taxonomyName}.`
        }
        metaImage={metaImage}
      />
      <main className={style.main}>
        <div className={style.title}>
          <h1 className={style.heading}>
            <span>
              {taxonomyName} {paginationTitle}
            </span>
          </h1>
        </div>
        <div className={style.content}>
          {taxonomyHtml && humanPageNumber === 1 && (
            <div
              className={style.intro}
              dangerouslySetInnerHTML={{ __html: taxonomyHtml }}
            />
          )}

          {posts.map(({ node }) => {
            const {
              id,
              excerpt: autoExcerpt,
              timeToRead,
              frontmatter: { title, date, path, author, image, excerpt },
            } = node

            return (
              <Entry
                key={id}
                title={title}
                date={date}
                path={path}
                author={author || siteAuthor}
                timeToRead={timeToRead}
                image={image}
                excerpt={excerpt || autoExcerpt}
              />
            )
          })}
        </div>
      </main>
      <Pagination
        previousPath={previousPagePath}
        previousLabel="Newer posts"
        nextPath={nextPagePath}
        nextLabel="Older posts"
      />
    </Layout>
  )
}

Categories.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string,
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
    humanPageNumber: PropTypes.number,
    numberOfPages: PropTypes.number,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $category: String!) {
    site {
      siteMetadata {
        author {
          name
          url
        }
      }
    }
    taxonomyYaml(id: { eq: $category }) {
      id
      name
      excerpt
      html
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          categories: { in: [$category] }
          published: { ne: false }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(format: HTML)
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            author
            excerpt
            categories
            image {
              childImageSharp {
                fluid(
                  maxWidth: 800
                  quality: 75
                  traceSVG: { background: "#fff", color: "#111" }
                ) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Categories
