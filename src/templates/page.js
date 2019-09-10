import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Document from '../components/Document'
import site from '../../config/site'

const PageTemplate = ({ data }) => {
  const {
    frontmatter: { title, date, last_modified_at, path, image, excerpt },
    excerpt: autoExcerpt,
    id,
    html,
  } = data.markdownRemark
  const metaImage = image ? image.childImageSharp.fixed : site.image

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
      <Document key={id} title={title} path={path} image={image} html={html} />
    </Layout>
  )
}

export default PageTemplate

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        last_modified_at(formatString: "MMMM DD, YYYY")
        path
        excerpt
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
  }
`
