export default function EditBookForm({ book, onUpdate, closeModal }) {
  if (!book) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const updatedBook = {
      id: book.id, // explicitly preserve the ID
      selected: book.selected, // explicitly preserve the selected state
      title: data.get("title"),
      author: data.get("author"),
      publisher: data.get("publisher"),
      publishYear: data.get("publish-year"),
      language: data.get("language"),
      pages: data.get("pages"),
      price: data.get("book-price"),
      url: data.get("book-cover-url"),
    };

    onUpdate(updatedBook);
    // closeModal();
    
    event.target.closest("dialog").close();
  }

  return (
    <div className="form-container">
      <h2>Edit Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input 
            name="title" 
            type="text" 
            placeholder="book title..." 
            defaultValue={book.title}
            required 
          />
        </div>
        <div className="form-control">
          <label>Author</label>
          <input 
            name="author" 
            type="text" 
            placeholder="Author" 
            defaultValue={book.author}
            required 
          />
        </div>
        <div className="form-control">
          <label>Publisher</label>
          <input 
            name="publisher" 
            type="text" 
            placeholder="Publisher"
            defaultValue={book.publisher}
          />
        </div>
        <div className="form-control">
          <label>Publication Year</label>
          <input 
            name="publish-year" 
            type="date"
            defaultValue={book.publishYear}
          />
        </div>
        <div className="form-control">
          <label>Language</label>
          <input 
            name="language" 
            type="text" 
            placeholder="Select Language"
            defaultValue={book.language}
          />
        </div>
        <div className="form-control">
          <label>Pages</label>
          <input 
            name="pages" 
            type="number"
            defaultValue={book.pages}
          />
        </div>
        <div className="form-control">
          <label>Price</label>
          <input 
            name="book-price" 
            type="number" 
            step={.01} 
            defaultValue={book.price}
            required 
          />
        </div>
        <div className="form-control">
          <label>URL (book-cover)</label>
          <input 
            name="book-cover-url" 
            type="text" 
            defaultValue={book.url}
            required 
          />
        </div>
        <button className="btn-modal">Save Changes</button>
      </form>
    </div>
  );
}
