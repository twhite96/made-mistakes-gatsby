import React from 'react'
import chunk from 'lodash/chunk'
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
          title={`Tiny paintings - ${site.title}`}
          path="/tiny-paintings/"
          description="Gallery of mini watercolor portraits painted at really small sizes."
          metaImage={metaImage}
        />
        <div className={style.post}>
          <h1 className={style.title}>Tiny paintings</h1>

          {this.props.data.file.childImageSharp.fluid && (
            <Img
              fluid={this.props.data.file.childImageSharp.fluid}
              className={style.coverImage}
            />
          )}
          <p>
            Trying to emulate the look and feel of{' '}
            <a href="/paperfaces/">watercolor on the iPad</a> has inspired me to
            revisit painting traditionally. I’ve gone mini in an effort to fit
            some painting in amongst family and work obligations.
          </p>
          <p>
            My plan was to complete a miniature 1.5" painting a day, but the
            challenge of painting so small is eating up way too much time.
            Instead I’m going to keep things casual and let images happen as
            they happen.
          </p>
          {chunk(
            posts.slice(0, this.state.postsToShow),
            this.state.postsToShow
            // eslint-disable-next-line no-shadow
          ).map((chunk, i) => (
            <div
              style={{
                display: `grid`,
                width: `100%`,
                gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                gridGap: `0.5em`,
                alignItems: `stretch`,
              }}
              key={`chunk-${i}`}
            >
              {chunk.map(post => {
                const image = post.frontmatter.thumbnail
                  ? post.frontmatter.thumbnail
                  : post.frontmatter.image

                return (
                  <Link
                    key={post.id}
                    style={{
                      display: `block`,
                      width: `200px`,
                      height: `200px`,
                    }}
                    to={post.frontmatter.path}
                  >
                    <Img
                      fixed={image.childImageSharp.fixed}
                      style={{
                        maxWidth: `100%`,
                      }}
                      imgStyle={{
                        marginBottom: `0`,
                      }}
                    />
                  </Link>
                )
              })}
            </div>
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
  query TinyPaintingsQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "tiny-paintings.jpg" }) {
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
      filter: { frontmatter: { categories: { in: "tiny-paintings" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            image {
              childImageSharp {
                fixed(width: 200, height: 200, quality: 80) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            thumbnail {
              childImageSharp {
                fixed(width: 200, height: 200, quality: 80) {
                  ...GatsbyImageSharpFixed
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
