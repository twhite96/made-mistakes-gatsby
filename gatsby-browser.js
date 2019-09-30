require('./src/styles/custom-block.css')
require('./src/styles/prism.css') // prismjs color theme

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
  }
}
