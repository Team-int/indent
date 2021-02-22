import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import Layout from '../layouts/layout'
import ReactMarkdown from 'react-markdown'

class Editor extends React.Component<
  undefined,
  { value: string; preview: boolean; title: string }
> {
  constructor(props: undefined) {
    super(props)
    this.state = {
      value: 'Start writing here...',
      preview: false,
      title: 'Untitled Post',
    }

    this.handleTextarea = this.handleTextarea.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
  }

  handleTextarea(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ value: event.target.value })
  }

  handleTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ title: event.target.value })
  }

  handleSubmit(event: React.SyntheticEvent): void {
    if (confirm('Are you really sure??')) {
      alert('h')
    }
    event.preventDefault()
  }

  render(): JSX.Element {
    return (
      <Layout title="Edit" fixed={true}>
        <div className="bg-white lg:rounded-md h-5/6 p-4 overflow-scroll ">
          <button
            className="text-base px-2 focus:outline-none"
            onClick={() => this.setState({ preview: false })}
          >
            Edit
          </button>

          <button
            className="text-base px-2 focus:outline-none"
            onClick={() => this.setState({ preview: true })}
          >
            Preview
          </button>

          <div className={this.state.preview ? 'hidden' : ''}>
            <input
              className="text-4xl lg:text-6xl sm:px-4 focus:outline-none w-full py-4 font-semibold "
              onChange={this.handleTitle}
              value={this.state.title}
            />
            <TextareaAutosize
              className="w-full sm:px-4 py-2 rounded shadow-none border-0 focus:ring-0 font-mono text-xl"
              value={this.state.value}
              onChange={this.handleTextarea}
            />
          </div>
          <div className={!this.state.preview ? 'hidden' : ''}>
            <p className="sm:px-4 text-4xl  lg:text-6xl font-semibold py-4">{this.state.title}</p>
            <ReactMarkdown className="sm:px-4 prose prose-lg">{this.state.value}</ReactMarkdown>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 my-4 rounded-md text-white disabled:opacity-50 opacity-100"
          disabled={this.state.value == 'Start writing here...'}
          onClick={this.handleSubmit}
        >
          Publish
        </button>
      </Layout>
    )
  }
}
export default Editor
