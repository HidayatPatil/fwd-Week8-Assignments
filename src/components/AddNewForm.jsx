import { nanoid } from "nanoid";

export default function AddNewForm({add}) {

  function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);

    add({
      title: data.get("title"),
      author: data.get("author"),
      publisher: data.get("publisher"),
      price: data.get("book-price"),
      url: data.get("book-cover-url"),
      id: nanoid(),
    })

    event.target.reset();
    event.target.closest("dialog").close();
  }

  return (
    <div className="form-container">
      <h2>New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input name="title" type="text" placeholder="book title..." required></input>
        </div>
        <div className="form-control">
          <label>Author</label>
          <input name="author" type="text" placeholder="Author" required></input>
        </div>
        <div className="form-control">
          <label>Publisher</label>
          <input name="publisher" type="text" placeholder="Publisher" required></input>
        </div>
        <div className="form-control">
          <label>Publication Year</label>
          <input name="publish-year" type="date"></input>
        </div>
        <div className="form-control">
          <label>Language</label>
          <input name="language" type="text" placeholder="Select Language"></input>
        </div>
        <div className="form-control">
          <label>Pages</label>
          <input name="pages" type="number"></input>
        </div>
        <div className="form-control">
          <label>Price</label>
          <input name="book-price" type="number" step={.01} required></input>
        </div>
        <div className="form-control">
          <label>URL (book-cover)</label>
          <input name="book-cover-url" type="text" required></input>
        </div>
        <button className="btn-modal">Add Book</button>
      </form>
    </div>
  );
}
