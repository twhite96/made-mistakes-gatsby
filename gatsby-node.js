const _ = require('lodash')
const { paginate } = require('gatsby-awesome-pagination')
const { forEach, uniq, filter, not, isNil, flatMap } = require('rambdax')
const path = require('path')

const postTemplate = path.resolve(`./src/templates/post.js`)
const pageTemplate = path.resolve(`./src/templates/page.js`)
const indexTemplate = path.resolve(`./src/templates/index.js`)
const tagsTemplate = path.resolve(`./src/templates/tags.js`)

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions
  const allNodes = getNodes()

  return graphql(`
    {
      posts: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          fields: { sourceName: { ne: "comments" } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags {
                id
                description
              }
            }
            fileAbsolutePath
          }
        }
      }
      pages: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/pages/" }
          fields: { sourceName: { ne: "comments" } }
        }
      ) {
        edges {
          node {
            frontmatter {
              path
              title
            }
            fileAbsolutePath
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      site: { siteMetadata },
    } = result.data

    const postsNodes = allNodes.filter(
      ({ internal, fileAbsolutePath }) =>
        internal.type === 'MarkdownRemark' &&
        fileAbsolutePath.indexOf('/posts/') !== -1
    )
    const posts = result.data.posts.edges
    const pages = result.data.pages.edges

    // Create posts index with pagination
    const indexPrefix = ({ pageNumber }) => (pageNumber === 0 ? '/' : '/page')

    paginate({
      createPage,
      items: postsNodes,
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: indexPrefix,
    })

    // Create Markdown posts
    posts.forEach(({ node }, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {
          next,
          previous,
        },
      })
    })

    // Create Markdown pages
    pages.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
      })
    })

    // Create tag pages
    const tags = filter(
      tag => not(isNil(tag)),
      uniq(flatMap(post => post.frontmatter.tags, postsNodes))
    )

    forEach(tag => {
      const postsWithTag = postsNodes.filter(
        post =>
          post.frontmatter.tags.id &&
          post.frontmatter.tags.id.indexOf(tag) !== -1
      )

      const tagPrefix = ({ pageNumber }) =>
        pageNumber === 0
          ? `/tag/${_.kebabCase(tag)}`
          : `/tag/${_.kebabCase(tag)}/page`

      paginate({
        createPage,
        items: postsWithTag,
        component: tagsTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: tagPrefix,
        context: {
          tag,
        },
      })
    }, tags)

    return {
      tags,
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      title: String!
      date: Date @dateformat
      last_modified_at: Date @dateformat
      author: String
      path: String!
      excerpt: String
      image: File @fileByRelativePath
    }
    type TaxonomyYaml implements Node {
      id: String!
      description: String
    }
  `
  createTypes(typeDefs)
}
