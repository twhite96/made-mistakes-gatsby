const postCssPresetEnv = require(`postcss-preset-env`)
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const cssnano = require('cssnano')
const postCSSMixins = require('postcss-mixins')

const site = require('./config/site')

module.exports = {
  siteMetadata: {
    siteUrl: `${site.url}/`,
    title: site.title,
    titleAlt: site.titleAlt,
    description: site.description,
    image: site.image,
    headline: site.headline,
    siteLanguage: site.siteLanguage,
    ogLanguage: site.ogLanguage,
    author: site.author,
    twitter: site.twitter,
    facebook: site.facebook,

    // Starter config
    logoText: 'Made Mistakes',
    logo: {
      src: '',
      alt: '',
    },
    copyrights: '',
    defaultTheme: 'light',
    postsPerPage: 10,
    showMenuItems: 2,
    menuMoreText: 'Show more',
    mainMenu: [
      {
        title: 'About',
        path: '/about/',
      },
      {
        title: 'Articles',
        path: '/articles/',
      },
      {
        title: 'Contact',
        path: '/contact/',
      },
      {
        title: 'FAQs',
        path: '/faqs/',
      },
      {
        title: 'Mastering Paper',
        path: '/mastering-paper/',
      },
      {
        title: 'Notes',
        path: '/notes/',
      },
      {
        title: 'Sitemap',
        path: '/sitemap/',
      },
      {
        title: 'Support',
        path: '/support/',
      },
      {
        title: 'All Tags',
        path: '/tag/',
      },
      {
        title: 'Terms',
        path: '/terms/',
      },
      {
        title: 'Work',
        path: '/work/',
      },
      {
        title: 'PaperFaces',
        path: '/paperfaces/',
      },
      {
        title: 'Procreate Paintings',
        path: '/procreate-paintings/',
      },
      {
        title: 'Tiny Paintings',
        path: '/tiny-paintings/',
      },
    ],
  },
  plugins: [
    'babel-preset-gatsby',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/posts/articles`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'mastering-paper',
        path: `${__dirname}/src/posts/mastering-paper`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'notes',
        path: `${__dirname}/src/posts/notes`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'paperfaces',
        path: `${__dirname}/src/posts/paperfaces`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'procreate',
        path: `${__dirname}/src/posts/procreate-paintings`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'tiny-paintings',
        path: `${__dirname}/src/posts/tiny-paintings`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'work',
        path: `${__dirname}/src/posts/work`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'comments',
        path: `${__dirname}/src/comments`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    'gatsby-remark-source-name',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 2,
            preserve: false,
          }),
          cssnano({
            preset: 'default',
          }),
        ],
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 80,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              quality: 80,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: '@weknow/gatsby-remark-twitter',
            options: {
              hideThread: true,
              hideMedia: false,
              align: 'center',
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                notice: {
                  classes: 'notice',
                  title: 'optional',
                },
              },
            },
          },
          'gatsby-remark-emoji',
          'gatsby-remark-abbr',
          'gatsby-remark-numbered-footnotes',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              removeAccents: true,
              enableCustomId: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: site.title,
    //     short_name: site.titleAlt,
    //     start_url: '/',
    //     background_color: site.backgroundColor,
    //     theme_color: site.themeColor,
    //     display: 'standalone',
    //     icon: site.favicon,
    //   },
    // },
  ],
}
