import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Facebook from './facebook'
import Twitter from './twitter'

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const SEO = ({
  title,
  description,
  metaImage,
  path,
  article,
  datePublished,
  dateModified,
}) => {
  const { site } = useStaticQuery(query)

  const {
    buildTime,
    siteMetadata: {
      siteUrl,
      defaultTitle,
      defaultDescription,
      defaultBanner,
      siteLanguage,
      ogLanguage,
      author,
      twitter,
      facebook,
    },
  } = site

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${metaImage.src || defaultBanner}`,
    url: `${siteUrl}${path || ''}`,
  }

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: siteUrl,
    inLanguage: siteLanguage,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      '@type': 'Person',
      name: author,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: author,
    },
    creator: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}${defaultBanner}`,
      },
    },
    datePublished,
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: seo.image,
    },
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl,
        name: 'Homepage',
      },
      position: 1,
    },
  ]

  let schemaArticle = null

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: defaultTitle,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${defaultBanner}`,
        },
      },
      headline: seo.title,
      datePublished,
      dateModified,
      description: seo.description,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
      },
      position: 2,
    })
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <>
      <Helmet title={seo.title}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
        {!article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgWebPage)}
          </script>
        )}
        {article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaArticle)}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <Facebook
        description={seo.description}
        image={seo.image}
        // width={metaImage.width}
        // height={metaImage.height}
        title={seo.title}
        type={article ? 'article' : 'website'}
        url={seo.url}
        locale={ogLanguage}
        name={facebook}
      />
      <Twitter
        title={seo.title}
        image={seo.image}
        description={seo.description}
        username={twitter}
      />
    </>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
  metaImage: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  path: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  datePublished: null,
  dateModified: null,
  metaImage: null,
  path: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: image
        siteLanguage
        ogLanguage
        author
        twitter
        facebook
      }
    }
  }
`
