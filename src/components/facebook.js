import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const Facebook = ({
  url,
  name,
  type,
  title,
  description,
  image,
  width,
  height,
  locale,
}) => (
  <Helmet>
    {name && <meta property="og:site_name" content={name} />}
    <meta property="og:locale" content={locale} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    {width && <meta property="og:image:width" content={width} />}
    {height && <meta property="og:image:height" content={height} />}
  </Helmet>
)

export default Facebook

Facebook.propTypes = {
  url: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  name: PropTypes.string,
}

Facebook.defaultProps = {
  type: 'website',
  name: null,
}
