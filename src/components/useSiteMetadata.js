import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          buildTime(formatString: "YYYY-MM-DD")
          siteMetadata {
            siteUrl
            title
            description
            defaultBanner: image {
              src
            }
            siteLanguage
            ogLanguage
            pingbackUrl
            webmentionUrl
            micropubUrl
            coilUrl
            author {
              name
              url
            }
            twitter
            facebook
            defaultTheme
            twitterUrl
            githubUrl
            instagramUrl
            feedUrl
            copyrights
            mainMenu {
              title
              path
            }
            footerMenu {
              title
              path
            }
            menuMoreText
          }
        }
      }
    `
  )
  return site.siteMetadata
}
