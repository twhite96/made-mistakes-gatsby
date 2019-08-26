import React from 'react'
import chunk from 'lodash/chunk'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'

import site from '../../config/site'

import '../styles/layout.css'

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
      this.setState({ postsToShow: this.state.postsToShow + 32 })
    }
    this.ticking = false
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(e => e.node)

    return (
      <>
        <SEO
          title={`Gallery - ${site.title}`}
          path="/gallery/"
          description="Gallery description"
          metaImage={metaImage}
        />
        <Layout>
          <h1 className="infoBanner">Gallery</h1>

          <div
            style={{
              display: `grid`,
              width: `100%`,
              gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
              gridGap: `0.5em`,
              alignItems: `stretch`,
            }}
          >
            {chunk(posts.slice(0, this.state.postsToShow), 4).map(
              (chunk, i) => (
                <div key={`chunk-${i}`}>
                  {chunk.map(post => (
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
                        fixed={
                          post.frontmatter.image.childImageSharp.fixed
                        }
                        style={{
                          maxWidth: `100%`,
                        }}
                        imgStyle={{
                          marginBottom: `0`,
                        }}
                      />
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
          {!this.state.showingMore && (
            <a
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
                this.setState({
                  postsToShow: this.state.postsToShow + 20,
                  showingMore: true,
                })
              }}
            >
              Load more
            </a>
          )}
        </Layout>
      </>
    )
  }
}

export const pageQuery = graphql`
  query GalleryExampleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "paperfaces" } } }
    ) {
      edges {
        node {
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
          }
        }
      }
    }
  }
`

export default Gallery
