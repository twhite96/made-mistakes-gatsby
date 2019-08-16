import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

import site from '../../config/site'

const _ = require('lodash')

const metaImage = site.image
const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout>
    <SEO
      title={`All tags | ${site.titleAlt}`}
      path="/tag/"
      description="An archive of posts organized by topic."
      metaImage={metaImage}
    />
    <h1>All tags</h1>
    <ul>
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tag/${_.kebabCase(tag.fieldValue)}/`}>
            <span>{tag.fieldValue}</span>{' '}
            <span className="count">{tag.totalCount}</span>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
