const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      Title:&nbsp;
      <input
        name="title"
        value={title}
        onChange={handleTitleChange}
        required
      />
    </div>
    <div>
      Author:&nbsp;
      <input
        name="author"
        value={author}
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      Url:&nbsp;
      <input
        name="url"
        value={url}
        onChange={handleUrlChange}
        required
      />
    </div>
    <button type="submit">
      Create
    </button>
  </form>
)

export default BlogForm
