/* eslint-disable prefer-object-spread */
const postCSSPresetEnv = require('postcss-preset-env')
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const postCSSMixins = require('postcss-mixins')
const cssnano = require('cssnano')

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
    pingbackUrl: site.pingbackUrl,
    webmentionUrl: site.webmentionUrl,
    micropubUrl: site.micropubUrl,
    author: {
      name: site.author.name,
      url: site.author.url,
    },
    twitter: site.twitter,
    facebook: site.facebook,

    // Starter config
    copyrights: '&copy; 2004&mdash;2019 Michael Rose.',
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
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCSSPresetEnv({
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
              linkImagesToOriginal: false,
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
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        exclude: [
          '/dev-404-page',
          '/404',
          '/404.html',
          '/offline-plugin-app-shell-fallback',
        ],
        createLinkInHead: true,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: 'daily',
              priority: 0.7,
            }
          }),
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
            ...rest
          },
        }) => {
          return {
            ...siteMetadata,
            ...rest,
            custom_namespaces: {
              webfeeds: 'http://webfeeds.org/rss/1.0',
            },
            custom_elements: [
              {
                'webfeeds:logo': site.url + site.favicon,
              },
              {
                'webfeeds:icon': site.url + site.favicon,
              },
              { 'webfeeds:accentColor': '000000' },
            ],
          }
        },
        feeds: [
          {
            query: `
              {
                allMarkdownRemark(
                  limit: 50,
                  filter: {
                    fileAbsolutePath: { regex: "/posts/" }
                    fields: { sourceName: { ne: "comments" } }
                    frontmatter: { published: { ne: false }, output: { ne: false } }
                  }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        excerpt
                        path
                        date
                        image {
                          childImageSharp {
                            fixed(width: 1000) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const {
                  node: {
                    frontmatter: { title, date, path, excerpt, image },
                    excerpt: autoExcerpt,
                    html,
                  },
                } = edge

                const permalink = site.siteMetadata.siteUrl + path
                const imageElement = image
                  ? `<p><img src="${site.siteMetadata.siteUrl +
                      image.childImageSharp.fixed.src}" alt=""></p>`
                  : ``
                const footerContent = `<p><a href="${site.siteMetadata.siteUrl +
                  edge.node.frontmatter.path}">${
                  edge.node.frontmatter.title
                }</a> was originally published on ${site.title}.</p>`

                return Object.assign({}, edge.node.frontmatter, {
                  title,
                  description: excerpt || autoExcerpt,
                  date,
                  url: permalink,
                  guid: permalink,
                  custom_elements: [
                    { 'content:encoded': imageElement + html + footerContent },
                  ],
                })
              })
            },
            output: '/atom.xml',
            title: `${site.title} RSS Feed`,
          },
          {
            query: `
              {
                allMarkdownRemark(
                  limit: 25,
                  filter: {
                    fileAbsolutePath: { regex: "/posts/articles/" }
                    fields: { sourceName: { ne: "comments" } }
                    frontmatter: { published: { ne: false }, output: { ne: false } }
                  }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        excerpt
                        path
                        date
                        image {
                          childImageSharp {
                            fixed(width: 1000) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const {
                  node: {
                    frontmatter: { title, date, path, excerpt, image },
                    excerpt: autoExcerpt,
                    html,
                  },
                } = edge

                const permalink = site.siteMetadata.siteUrl + path
                const imageElement = image
                  ? `<p><img src="${site.siteMetadata.siteUrl +
                      image.childImageSharp.fixed.src}" alt=""></p>`
                  : ``
                const footerContent = `<p><a href="${site.siteMetadata.siteUrl +
                  edge.node.frontmatter.path}">${
                  edge.node.frontmatter.title
                }</a> was originally published on ${site.title}.</p>`

                return Object.assign({}, edge.node.frontmatter, {
                  title,
                  description: excerpt || autoExcerpt,
                  date,
                  url: permalink,
                  guid: permalink,
                  custom_elements: [
                    { 'content:encoded': imageElement + html + footerContent },
                  ],
                })
              })
            },
            output: '/articles.xml',
            title: `${site.title} Articles RSS Feed`,
            match: '^/articles/',
          },
          {
            query: `
              {
                allMarkdownRemark(
                  limit: 25,
                  filter: {
                    fileAbsolutePath: { regex: "/posts/notes/" }
                    fields: { sourceName: { ne: "comments" } }
                    frontmatter: { published: { ne: false }, output: { ne: false } }
                  }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        excerpt
                        path
                        date
                        image {
                          childImageSharp {
                            fixed(width: 1000) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const {
                  node: {
                    frontmatter: { title, date, path, excerpt, image },
                    excerpt: autoExcerpt,
                    html,
                  },
                } = edge

                const permalink = site.siteMetadata.siteUrl + path
                const imageElement = image
                  ? `<p><img src="${site.siteMetadata.siteUrl +
                      image.childImageSharp.fixed.src}" alt=""></p>`
                  : ``
                const footerContent = `<p><a href="${site.siteMetadata.siteUrl +
                  edge.node.frontmatter.path}">${
                  edge.node.frontmatter.title
                }</a> was originally published on ${site.title}.</p>`

                return Object.assign({}, edge.node.frontmatter, {
                  title,
                  description: excerpt || autoExcerpt,
                  date,
                  url: permalink,
                  guid: permalink,
                  custom_elements: [
                    { 'content:encoded': imageElement + html + footerContent },
                  ],
                })
              })
            },
            output: '/notes.xml',
            title: `${site.title} Notes RSS Feed`,
            match: '^/notes/',
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
