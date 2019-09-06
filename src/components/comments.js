import React from 'react'
import { graphql } from 'gatsby'
import Comment from './comment'

const Comments = data => {
  const {
    commentsList: { edges: comments },
  } = data

  const commentTitle = commentLength => {
    if (commentLength < 1) {
      return 'Leave a comment'
    }
    if (commentLength === 1) {
      return '1 comment'
    }
    return `${commentLength} comments`
  }

  // // Check if comments exist
  // if (Object.keys(comments).length === 0) {
  //   return null
  // }
  const commentsList =
    comments && comments.length ? (
      comments.map(({ node }) => {
        const {
          id,
          frontmatter: { name, url, email, friendlyDate, iso8601Date },
          html,
        } = node

        return (
          <Comment
            key={id}
            name={name}
            url={url}
            friendlyDate={friendlyDate}
            iso8601Date={iso8601Date}
            email={email}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Comment>
        )
      })
    ) : (
      <p>No comments.</p>
    )

  return (
    <>
      <h2>{commentTitle(comments.length)}</h2>
      {commentsList}
    </>
  )
}

export default Comments

export const commentsByPath = graphql`
  fragment commentsQueryFragment on Query {
    comments: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "comments" } }
        frontmatter: { _parent: { eq: $path }, published: { ne: false } }
      }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      edges {
        node {
          ...commentAttributesFragment
        }
      }
    }
  }
`
