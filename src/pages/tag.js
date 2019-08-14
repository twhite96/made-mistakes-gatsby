import { graphql, Link } from 'gatsby'
const _ = require('lodash')
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group }
  },
}) => (
  <Layout>
    <SEO title="All tags" />
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
