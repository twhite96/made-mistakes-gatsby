import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

import site from '../../config/site'

const NotFoundPage = () => (
  <Layout>
    <SEO
      title={`Page not found - ${site.titleAlt}`}
      description="Sorry, but the pixels you are looking for are in another castle."
      metaImage={site.image}
    />
    <h1>404: Not found</h1>
    <p>Sorry, but the pixels you are looking for are in another castle.</p>
  </Layout>
)

export default NotFoundPage
