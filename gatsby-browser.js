require('./src/styles/global.css')
require('./src/styles/prism.css')

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  // if (typeof window.IntersectionObserver === `undefined`) {
  //   import(`intersection-observer`)
  // }

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]', {
      speed: 600,
      speedAsDuration: true,
      easing: 'easeInOutQuad',
    })
  }
}
