require('./src/styles/global.css')
require('./src/styles/prism.css')

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
  }
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This website has been updated. ` + `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
