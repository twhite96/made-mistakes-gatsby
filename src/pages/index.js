import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Entry from '../components/Entry'

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
        path="/"
        description={site.description}
        metaImage={site.image}
      />
      <main className={style.main}>
        <div className={style.title}>
          <h1 className={style.heading}>
            <span>
              Made Mistakes is the personal site of{' '}
              <a href="/about/">Michael Rose</a>.
            </span>
          </h1>
          <div className={style.intro}>
            <p>
              I'm just another boring, tattooed, time traveling designer from
              Buffalo New York who enjoys eating chicken wings, sketching on an
              iPad Pro, building with static site generators, and playing
              Nintendo Switch.
            </p>
          </div>
          <Img
            fluid={data.aboutImage.childImageSharp.fluid}
            className={style.cover}
          />
        </div>
        <div className={style.content}>
          <h2 className={style.subHeading}>Featured articles</h2>
          <div className={style.gridList}>
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
          <h2 className={style.subHeading}>Explore more on this site</h2>
          <div>
            <ul className={`${style.gridListExpanded} ${style.navList}`}>
              <li>
                <Entry
                  key="articles-home-link"
                  title="Articles"
                  path="/articles/"
                  excerpt="<p>Long form writing mostly about design and web development.</p>"
                />
              </li>
              <li>
                <Entry
                  key="notes-home-link"
                  title="Notes"
                  path="/notes/"
                  excerpt="<p>Thoughts, inspiration, mistakes, and other minutia you&rsquo;d find in a blog.</p>"
                />
              </li>
              <li>
                <Entry
                  key="works-home-link"
                  title="Works"
                  path="/work/"
                  excerpt="<p>Hand-picked selection of things I've designed, illustrated,
                  and developed.</p>"
                />
              </li>
              <li>
                <Entry
                  key="mastering-paper-home-link"
                  title="Mastering Paper"
                  path="/mastering-paper/"
                  excerpt="<p>Tutorials to help master the iOS drawing app&mdash;
                Paper</p>"
                />
              </li>
              <li>
                <Entry
                  key="contact-home-link"
                  title="Contact"
                  path="/contact/"
                  excerpt="<p>Preferred methods of sending questions, messages, and
                  love letters to me.</p>"
                />
              </li>
              <li>
                <Entry
                  key="support-home-link"
                  title="Show your support"
                  path="/support/"
                  excerpt="<p>Give thanks for the free open source goodies I provide.</p>"
                />
              </li>
              <li>
                <Entry
                  key="faqs-home-link"
                  title="Frequently asked questions"
                  path="/faqs/"
                  excerpt="<p>There&rsquo;s no such thing as a dumb question&hellip;</p>"
                />
              </li>
              <li>
                <Entry
                  key="topics-home-link"
                  title="All topics"
                  path="/tag/"
                  excerpt="<p>Archive of all posts organized by topic.</p>"
                />
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
        frontmatter: {
          featured: { eq: true }
          published: { ne: false }
          output: { ne: false }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
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
            featured
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
        fluid(
          maxWidth: 720
          maxHeight: 480
          quality: 75
          traceSVG: { background: "#fff", color: "#111" }
        ) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

export default HomePage
