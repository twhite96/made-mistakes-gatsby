import React from 'react'
import PropTypes from 'prop-types'

import site from '../../../config/site'

import style from '../../styles/CommentForm.module.css'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    const slugDir = this.props.slug.replace(/^\/+|/g, ``)

    this.initialState = {
      submitting: false,
      success: false,
      error: false,
      commentCount: this.props.commentCount,
      newComment: {
        parent: this.props.slug,
        slug: slugDir,
        'fields[name]': '',
        'fields[email]': '',
        'fields[url]': '',
        'fields[message]': '',
      },
    }

    this.state = this.initialState
  }

  onSubmitComment = async event => {
    event.preventDefault()

    this.setState({ submitting: true })

    // extract form data
    const formdata = new FormData(event.target)
    const formUrl = site.staticmanApi

    // convert FormData to json object
    // SOURCE: https://stackoverflow.com/a/46774073
    const json = {}
    formdata.forEach(function(value, prop) {
      json[prop] = value
    })

    // convert json to urlencoded query string
    // SOURCE: https://stackoverflow.com/a/37562814 (comments)
    const formBody = Object.keys(json)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
      .join('&')

    // POST the request to Staticman's API endpoint
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
    })

    if (response.ok === true) {
      this.setState(prevState => ({
        ...prevState,
        newComment: {
          parent: '',
          slug: '',
          'fields[name]': '',
          'fields[email]': '',
          'fields[url]': '',
          'fields[message]': '',
        },
        success: true,
        error: false,
      }))
    } else {
      this.setState({ ...this.initialState, error: true })
    }
  }

  handleChange = event => {
    const { newComment } = this.state
    const { name, value } = event.target

    this.setState({
      newComment: { ...newComment, [name]: value },
    })
  }

  render() {
    const {
      submitting,
      success,
      error,
      newComment: { name, email, url, message },
    } = this.state

    const showError = () => error && <p>An error occured.</p>
    const showSuccess = () => success && <p>Comment submitted!</p>
    const slugDir = this.props.slug.replace(/^\/+|/g, ``)

    return (
      <div>
        {success || error ? (
          showError() || showSuccess()
        ) : (
          <>
            <h3 className={style.title}>Leave a comment</h3>
            <form
              id="new-comment"
              className={style.form}
              onSubmit={this.onSubmitComment}
            >
              <input
                name="options[parent]"
                type="hidden"
                value={this.props.slug}
              />
              <input name="options[slug]" type="hidden" value={slugDir} />
              <div className={style.row}>
                <label className={style.label} htmlFor="name">
                  Name
                  <input
                    id="name"
                    className={style.input}
                    name="fields[name]"
                    value={name}
                    type="text"
                    placeholder="Your name"
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label className={style.label} htmlFor="email">
                  E-mail
                  <input
                    id="email"
                    className={style.input}
                    name="fields[email]"
                    value={email}
                    type="email"
                    placeholder="email@domain.com"
                    onChange={this.handleChange}
                  />
                </label>
                <label className={style.label} htmlFor="website">
                  Website (optional)
                  <input
                    id="website"
                    className={style.input}
                    name="fields[url]"
                    value={url}
                    placeholder="https://domain.com"
                    onChange={this.handleChange}
                    type="text"
                  />
                </label>
              </div>
              <div className={style.row}>
                <label className={style.label} htmlFor="message">
                  Comment
                  <textarea
                    id="message"
                    className={style.textarea}
                    name="fields[message]"
                    value={message}
                    placeholder="Your message"
                    rows="6"
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <button
                className={style.submit}
                type="submit"
                disabled={submitting}
              >
                Send comment
              </button>
            </form>
          </>
        )}
      </div>
    )
  }
}

CommentForm.propTypes = {
  slug: PropTypes.string.isRequired,
  commentCount: PropTypes.number,
}

export default CommentForm
