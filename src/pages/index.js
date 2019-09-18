import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Section from '../components/Section'

import site from '../../config/site'

const HomePage = () => (
  <Layout>
    <SEO
      title={`${site.title} - ${site.description}`}
      description={site.description}
      metaImage={site.image}
    />
    <h1 style={{ display: 'none' }}>{site.title}</h1>
    <Section
      title="A faux pas"
      description="<p>I'm just another boring, tattooed, <em>time traveling
      designer</em> from Buffalo New York. I enjoy eating chicken wings,
      sketching on an iPad Pro, and playing console games.</p>"
    >
      <Link to="/about/">About Michael</Link>
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
      <Link to="/articles/">the archives</Link>
    </Section>
    <Section
      title="Work"
      description="<p>A hand-picked selection of things I've designed, illustrated,
      and developed.</p>"
    >
      <Link to="/work/">the gallery</Link>
    </Section>
  </Layout>
)

export default HomePage
