import React from 'react'
import chunk from 'lodash/chunk'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

import site from '../../config/site'
import style from '../styles/Document.module.css'

const metaImage = site.image

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 32
}

class Gallery extends React.Component {
  constructor() {
    super()
    const postsToShow = 32

    this.state = {
      showingMore: postsToShow > 32,
      postsToShow,
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState(prevState => ({ postsToShow: prevState.postsToShow + 32 }))
    }
    this.ticking = false
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(e => e.node)

    return (
      <Layout>
        <SEO
          title={`PaperFaces iPad project - ${site.title}`}
          path="/paperfaces/"
          description="PaperFaces portraits painted digitally with Paper for
          iOS on an iPad. Find time lapse videos, in-process screenshots, and more."
          metaImage={metaImage}
        />
        <div className={style.post}>
          <h1 className={style.title}>PaperFaces iPad project</h1>

          {this.props.data.file.childImageSharp.fluid && (
            <Img
              fluid={this.props.data.file.childImageSharp.fluid}
              className={style.coverImage}
            />
          )}
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
          {chunk(
            posts.slice(0, this.state.postsToShow),
            this.state.postsToShow
            // eslint-disable-next-line no-shadow
          ).map((chunk, i) => (
            <Masonry className={style.grid} key={`chunk-${i}`}>
              {chunk.map(post => {
                const image = post.frontmatter.thumbnail
                  ? post.frontmatter.thumbnail
                  : post.frontmatter.image

                return (
                  <div className={style.gridItem}>
                    <Link key={post.id} to={post.frontmatter.path}>
                      <Img fluid={image.childImageSharp.fluid} />
                    </Link>
                  </div>
                )
              })}
            </Masonry>
          ))}
          {!this.state.showingMore && (
            <button
              type="button"
              data-testid="load-more"
              style={{
                margin: `0 auto`,
                padding: `0.5em`,
                color: `#fff`,
                backgroundColor: `#000`,
                border: `1px solid #000`,
                cursor: `pointer`,
              }}
              onClick={() => {
                this.setState(prevState => ({
                  postsToShow: prevState.postsToShow + 32,
                  showingMore: true,
                }))
              }}
            >
              Load more
            </button>
          )}
        </div>
      </Layout>
    )
  }
}

Gallery.propTypes = {
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
                fluid(maxHeight: 400, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            thumbnail {
              childImageSharp {
                fluid(maxHeight: 400, quality: 80) {
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

export default Gallery
