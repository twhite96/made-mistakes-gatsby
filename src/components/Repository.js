import React from 'react'
import Octicon, { Law, Star } from '@githubprimer/octicons-react'
import GitHubButton from 'react-github-btn'

import style from '../styles/Repository.module.css'

const RepositoryHeader = ({ repo }) => {
  return (
    <div className={style.header}>
      <h3 className={style.name}>
        <a
          href={`https://github.com${repo.resourcePath}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
      </h3>
      <GitHubButton
        href={`https://github.com${repo.resourcePath}`}
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star repo on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  )
}

const FooterItem = ({ children }) => (
  <span className={style.footerItem}>{children}</span>
)

const RepositoryFooter = ({ repo }) => {
  const language = repo.languages.edges[0].node
  const timeAgo = new Date(repo.updatedA) - new Date()
  const daysAgo = Math.floor(timeAgo / (1000 * 60 * 60 * 24)) // ms to days
  let updatedAt = repo.updatedAt.slice(0, 10)

  if (daysAgo > -21) {
    updatedAt = new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(
      daysAgo,
      'day'
    )
  }
  return (
    <div className={style.footer}>
      <FooterItem>
        <span
          className={style.languageBadge}
          style={{
            backgroundColor: language.color,
          }}
        />{' '}
        {language.name}
      </FooterItem>
      <FooterItem>
        <Octicon icon={Star} verticalAlign="text-top" />{' '}
        {repo.stargazers.totalCount}
      </FooterItem>
      {repo.licenseInfo && (
        <FooterItem>
          <Octicon icon={Law} verticalAlign="text-top" />{' '}
          {repo.licenseInfo.name}
        </FooterItem>
      )}
      <FooterItem>Updated: {updatedAt}</FooterItem>
    </div>
  )
}

const RepositoryDescription = ({ repo }) => (
  <div className={style.description}>
    <p>{repo.description}</p>
  </div>
)

const Repository = ({ repo }) => {
  return (
    <div className={style.repository}>
      <RepositoryHeader repo={repo} />
      <RepositoryDescription repo={repo} />
      <RepositoryFooter repo={repo} />
    </div>
  )
}

export default Repository
