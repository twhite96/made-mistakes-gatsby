import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Section from '../components/Section'

import style from '../styles/Document.module.css'

import site from '../../config/site'

const HomePage = ({ data }) => (
  <Layout>
    <SEO
      title={`${site.title} - ${site.description}`}
      description={site.description}
      metaImage={site.image}
    />
    <main class={style.document}>
      <h1 style={{ display: 'none' }}>{site.title}</h1>
      <Section
        title="A faux pas"
        description="<p>Hello, my name is Michael Rose.</p><p>I'm just another
        boring, tattooed, <em>time traveling designer</em> from Buffalo New York.</p>
        <p>I enjoy eating chicken wings, sketching on an iPad Pro, building
        with static site generators, and playing Nintendo Switch.</p>"
      >
        <Img
          fixed={data.aboutImage.childImageSharp.fixed}
          style={{
            maxWidth: `100%`,
          }}
          imgStyle={{
            marginBottom: `0`,
          }}
        />
        <p>
          <Link to="/about/">Learn more about me</Link>
        </p>
      </Section>
      <Section
        title="Writing"
        description="<p>A collection of thoughts, inspiration, mistakes, and other
        minutia I've written. Topics covered include
        <a href='/tag/web-development/'><em>web development</em></a>,
        <a href='/mastering-paper/'><em>Mastering Paper</em></a>,
        <a href='/tag/design/'><em>design</em></a>, <a href='/tag/til/'><em>#TIL</em></a>,
        and more <a href='/tag/' title='browse all site topics'>more</a>.</p>"
      >
        <Img
          fixed={data.writingImage.childImageSharp.fixed}
          style={{
            maxWidth: `100%`,
          }}
          imgStyle={{
            marginBottom: `0`,
          }}
        />
        <p>
          <Link to="/articles/">Browse the archives</Link>
        </p>
      </Section>
      <Section
        title="Work"
        description="<p>A hand-picked selection of things I've designed, illustrated,
        and developed.</p>"
      >
        <Img
          fixed={data.worksImage.childImageSharp.fixed}
          style={{
            maxWidth: `100%`,
          }}
          imgStyle={{
            marginBottom: `0`,
          }}
        />
        <p>
          <Link to="/work/">Give them a look</Link>
        </p>
      </Section>
    </main>
  </Layout>
)

HomePage.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query SectionImageQuery {
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
