import React from 'react'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

import site from '../../config/site'
import style from '../styles/Document.module.css'

const metaImage = site.image

const GalleryPage = ({ data }) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    allMarkdownRemark: { edges: posts },
  } = data
  return (
    <Layout>
      <SEO
        title={`PaperFaces iPad project - ${site.title}`}
        path="/paperfaces/"
        description="PaperFaces portraits painted digitally with Paper for
        iOS on an iPad. Find time lapse videos, in-process screenshots, and more."
        metaImage={metaImage}
      />
      <main className={style.document}>
        <div className={style.title}>
          <h1 className={style.heading}>
            <span>PaperFaces iPad project</span>
          </h1>
        </div>
        {data.file.childImageSharp.fluid && (
          <Img
            fluid={data.file.childImageSharp.fluid}
            className={style.cover}
          />
        )}
        <div className={style.content}>
          <p>
            PaperFaces was an illustration project by designer Michael Rose —
            hey that’s me! For two years I drew the faces of strangers everyday
            using an iPad, a stylus, and <strong>Paper for iOS</strong>. I
            occasionally post new portraits here, but certainly not as
            frequently as I used to.
          </p>
          <p>
            If you scroll down far enough you can see how my technique evolved
            from faceless gestures into realistic portraits.
          </p>
        </div>
        <div className={style.gallery}>
          {posts.map(({ node }) => {
            const {
              id,
              frontmatter: { path, image, thumbnail },
            } = node
            const newImage = thumbnail ? thumbnail : image

            return (
              <Masonry className={style.grid} key={id}>
                <div key={id} className={style.gridItem}>
                  <Link to={path}>
                    <Img fadeIn={false} fluid={image.childImageSharp.fluid} />
                  </Link>
                </div>
              </Masonry>
            )
          })}
        </div>
      </main>
    </Layout>
  )
}

GalleryPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PaperfacesQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "paperfaces-project-feature.jpg" }) {
      childImageSharp {
        fluid(
          maxWidth: 1100
          quality: 75
          traceSVG: { background: "#fff", color: "#111" }
        ) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        fixed(width: 1100, quality: 75) {
          src
          height
          width
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "paperfaces" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            image {
              childImageSharp {
                fluid(
                  maxHeight: 400
                  quality: 75
                  traceSVG: { background: "#fff", color: "#111" }
                ) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            thumbnail {
              childImageSharp {
                fluid(
                  maxHeight: 400
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

export default GalleryPage
