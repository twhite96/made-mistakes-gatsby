import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not found</h1>
    <p>Sorry, but the page you were trying to view has moved or does not exist.</p>
  </Layout>
)

export default NotFoundPage
