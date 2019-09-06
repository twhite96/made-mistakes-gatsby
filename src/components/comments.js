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
          frontmatter: { name, url, email, uuid, friendlyDate, iso8601Date },
          html,
        } = node

        return (
          <Comment
            key={uuid}
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
      <></>
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
        frontmatter: { _parent: { eq: $path } }
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
