import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const testUser = {
    id: '664e47362a784e18e56fc1fd',
    username: 'user123',
    name: 'User 123'
  }

  const testBlog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 1337,
    user: testUser
  }

  const renderBlog = () => render(
    <Blog
      blog={testBlog}
      user={testUser}
      likeBlog={() => {}}
      deleteBlog={() => {}}
    />
  )

  test('renders only title and author', () => {
    renderBlog()

    screen.getByText('React patterns', { exact: false })
    screen.getByText('Michael Chan', { exact: false })

    expect(screen.queryByText('https://reactpatterns.com/', { exact: false }))
      .toBeNull()
    expect(screen.queryByText('1337', { exact: false }))
      .toBeNull()
  })
})
