import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Entry from '../components/Entry'
import Section from '../components/Section'

import style from '../styles/Archive.module.css'

import site from '../../config/site'

const HomePage = ({ data }) => {
  const {
    site: {
      siteMetadata: { author: siteAuthor },
    },
    allMarkdownRemark: { edges: posts },
  } = data
  return (
    <Layout>
      <SEO
        title={`${site.title} - ${site.description}`}
        description={site.description}
        metaImage={site.image}
      />
      <main className={style.main}>
        <h1>
          Made Mistakes is the personal site of{' '}
          <a href="/about/">Michael Rose</a>.
        </h1>
        <div className={style.content}>
          <div className={style.intro}>
            <p>
              I'm just another boring, tattooed, >time traveling designer from
              Buffalo New York who enjoys eating chicken wings, sketching on an
              iPad Pro, building with static site generators, and playing
              Nintendo Switch.
            </p>
          </div>
          <h2>
            Featued articles [<a href="/articles/">browse all</a>]
          </h2>
          <div>
            {posts.map(({ node }) => {
              const {
                id,
                excerpt: autoExcerpt,
                frontmatter: {
                  title,
                  date,
                  path,
                  author,
                  timeToRead,
                  image,
                  excerpt,
                  tags,
                },
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
                  tags={tags}
                  excerpt={excerpt || autoExcerpt}
                />
              )
            })}
          </div>
          <div>
            <h2>Explore more on this site</h2>
            <ul>
              <li>
                <a href="/articles/">Articles</a>
                <p>Long form writing mostly about web development.</p>
              </li>
              <li>
                <a href="/notes/">Notes</a>
                <p>
                  Thoughts, inspiration, mistakes, and other minutia I've
                  written.
                </p>
              </li>
              <li>
                <a href="/mastering-paper/">Mastering Paper</a>
                <p>
                  Tutorials to help master the iOS drawing app,{' '}
                  <strong>Paper</strong>.
                </p>
              </li>
              <li>
                <a href="/about/">About</a>
                <p>More about me than you care to know.</p>
              </li>
              <li>
                <a href="/contact/">Contact</a>
                <p>
                  Preferred methods of sending your questions, messages, and
                  love letters to me.
                </p>
              </li>
              <li>
                <a href="/work/">Works</a>
                <p>
                  Hand-picked selection of things I've designed, illustrated,
                  and developed.
                </p>
              </li>
              <li>
                <a href="/support/">Show your support</a>
                <p>Show thanks for the free open source goodies I provide.</p>
              </li>
              <li>
                <a href="/faqs/">Frequently asked questions</a>
                <p>There's no such thing as a...</p>
              </li>
              <li>
                <a href="/tag/">All topics</a>
                <p>Archive of all posts organized by topic.</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        author {
          name
          url
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: { published: { ne: false }, output: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
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
                  maxWidth: 400
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
    aboutImage: file(relativePath: { eq: "michael-rose-glitched.jpg" }) {
      childImageSharp {
        fixed(width: 600) {
          src
          height
          width
        }
      }
    }
    writingImage: file(relativePath: { eq: "blog-articles.jpg" }) {
      childImageSharp {
        fixed(width: 600) {
          src
          height
          width
        }
      }
    }
    worksImage: file(
      relativePath: { eq: "procreate-paintings-glitched-feature.jpg" }
    ) {
      childImageSharp {
        fixed(width: 600) {
          src
          height
          width
        }
      }
    }
  }
`

export default HomePage
