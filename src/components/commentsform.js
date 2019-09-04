import React from 'react'
import PropTypes from 'prop-types'

import site from '../../config/site'

class CommentForm extends React.Component {
  render() {
    const slugDir = this.props.slug.replace(/^\/+|/g, ``)
    const formUrl = `https://api.staticman.net/v3/entry/github/mmistakes/made-mistakes-gatsby/master/comments`
    const successPage = `${site.url}/comment-success`

    return (
      <div>
        <h2>Leave a Comment</h2>
        <form method="POST" action={formUrl}>
          <input name="options[redirect]" type="hidden" value={successPage} />
          <input name="options[parent]" type="hidden" value={this.props.slug} />
          <input name="options[slug]" type="hidden" value={slugDir} />
          <div>
            <label htmlFor="name">
              Name
              <input id="name" name="fields[name]" type="text" required />
            </label>
            <label htmlFor="email">
              E-mail
              <input id="email" name="fields[email]" type="email" required />
            </label>
            <label htmlFor="website">
              Website (optional)
              <input id="website" name="fields[url]" type="text" />
            </label>
          </div>
          <div css={{ marginBottom: '1em' }}>
            <label htmlFor="message">
              Comment
              <textarea id="message" name="fields[message]" rows="6" required />
            </label>
          </div>
          <button type="submit">Ready to send?</button>
        </form>
      </div>
    )
  }
}

CommentForm.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default CommentForm
