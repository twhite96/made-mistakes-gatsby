const visit = require('unist-util-visit-parents')

module.exports = ({ markdownAST }) => {
  const htmls = []
  visit(markdownAST, 'html', node => {
    htmls.push(node)
  })
  const imageNodes = htmls.filter(html => html.value.indexOf('<img') >= 0)

  // const imageWrappers = document.querySelectorAll('gatsby-resp-image-wrapper')
  // // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // // for cross-browser looping through NodeList without polyfills
  // for (let i = 0; i < imageWrappers.length; i++) {
  //   const imageWrapper = imageWrappers[i]
  //   const imageElement = imageWrapper.querySelector('.gatsby-resp-image-image')
  //   // add data attribute for lazysizes
  //   imageElement.setAttribute('data-sizes', 'auto')
  // }

  return Promise.all(
    imageNodes.map(
      imageNode =>
        new Promise(resolve => {
          // Add class lazyload
          imageNode.value = imageNode.value.replace(
            'gatsby-resp-image-image',
            'gatsby-resp-image-image lazyload'
          )
          // Replace src to data-src
          imageNode.value = imageNode.value.replace('src=', 'data-src=')
          // Replace srcset to data-srcset
          imageNode.value = imageNode.value.replace('srcset=', 'data-srcset=')

          resolve(imageNode)
        })
    )
  )
}
