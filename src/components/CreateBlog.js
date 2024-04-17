import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Mario");
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setLoading(true);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setLoading(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title: </label>
        <input
          type="text"
          required
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Author: </label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Mario">Mario</option>
          <option value="Violet">Violet</option>
          <option value="Barbie">Barbie</option>
        </select>
        <label>Enter body: </label>
        <textarea
          type="text"
          required
          placeholder="Enter your blog"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {!isLoading ? (
          <button>Add Blog</button>
        ) : (
          <button disabled>Adding Blog</button>
        )}
      </form>
    </div>
  );
};

export default CreateBlog;
