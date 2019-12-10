import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Entry from '../components/entry'
import Pagination from '../components/pagination'

import site from '../../config/site'

import style from '../styles/archive.module.css'

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
          {taxonomyHtml && humanPageNumber === 1 && (
            <div
              className={style.intro}
              dangerouslySetInnerHTML={{ __html: taxonomyHtml }}
            />
          )}
        </div>
        <div className={style.content}>
          <div className={style.list}>
            {posts.map(({ node }) => {
              const {
                id,
                excerpt: autoExcerpt,
                timeToRead,
                frontmatter: {
                  title,
                  date,
                  date_pretty,
                  path,
                  author,
                  image,
                  excerpt,
                },
              } = node

              return (
                <Entry
                  key={id}
                  title={title}
                  date={date}
                  datePretty={date_pretty}
                  path={path}
                  author={author || siteAuthor}
                  timeToRead={timeToRead}
                  image={image}
                  excerpt={excerpt || autoExcerpt}
                />
              )
            })}
          </div>
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
            date
            date_pretty: date(formatString: "MMMM Do, YYYY")
            date_from_now: date(fromNow: true)
            path
            author
            excerpt
            categories
            image {
              childImageSharp {
                fluid(
                  maxWidth: 760
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
