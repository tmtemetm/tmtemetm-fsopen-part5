import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls create handler with correct parameters when submitted', async () => {
    const createBlogMock = vi.fn()
    const { container } = render(<BlogForm createBlog={createBlogMock} />)

    const titleInput = container.querySelector('[name="title"]')
    const authorInput = container.querySelector('[name="author"]')
    const urlInput = container.querySelector('[name="url"]')
    const submitButton = container.querySelector('[type="submit"]')

    const user = userEvent.setup()
    await user.type(titleInput, 'This is a blog')
    await user.type(authorInput, 'By an author')
    await user.type(urlInput, 'https://at.url')
    await user.click(submitButton)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0]).toStrictEqual({
      title: 'This is a blog',
      author: 'By an author',
      url: 'https://at.url'
    })
  })
})
