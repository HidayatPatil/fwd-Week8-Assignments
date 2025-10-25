import Book from "./components/Book";
import Modal from "./components/Modal";
import AddNewForm from "./components/AddNewForm";
import EditBookForm from "./EditBookForm";
import { useState, useEffect } from "react";

function App() {
  function loadFromLocalStorage() {
    const saved = localStorage.getItem('bookCatalog');
    return saved ? JSON.parse(saved) : [];
  }

  function saveToLocalStorage(books) {
    localStorage.setItem('bookCatalog', JSON.stringify(books));
  }

  const [newBooks, setNewBooks] = useState(loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage(newBooks);
  }, [newBooks]);

  function AddBook(newBook) {
    setNewBooks([...newBooks, { ...newBook, selected: false }]);
  }

  function ToggleSelectionState(id) {
    setNewBooks(
      newBooks.map((book) => {
        // if it's the clicked book → toggle its selected state
        if (book.id === id) {
          return { ...book, selected: !book.selected };
        }
        // all other books → deselect
        return { ...book, selected: false };
      })
    );
  }

  function DeleteBook() {
    setNewBooks(newBooks.filter((newBook) => newBook.selected === false));
  }

  function hasSelectedBook() {
    return newBooks.some((book) => book.selected);
  }

  function getSelectedBook() {
    return newBooks.find((book) => book.selected);
  }

  const uniquePublishers = [
    ...new Set(newBooks.map((book) => book.publisher)),
  ].filter(Boolean);
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const filterBooks = selectedPublisher
    ? newBooks.filter((book) => book.publisher === selectedPublisher)
    : newBooks;

  function handleFilterChange(e) {
    setSelectedPublisher(e.target.value);
  }

  return (
    <div className="app_body">
      <div className="header">
        <h1>Book Catalog</h1>
      </div>
      <div className="book_filter">
        <p>Filter By Publisher</p>
        <select className="selection_field" onChange={handleFilterChange} >
          <option value="">All</option>
          {uniquePublishers.map((publisher) => (
            <option key={publisher} value={publisher}>
              {publisher}
            </option>
          ))}
        </select>
      </div>
      <div className="book_listing">
        <div className="add_card">
          <Modal btnClassName="add_new" btnLabel="New">
            <AddNewForm add={AddBook} closeModal={Modal.closeModal} />
          </Modal>
          <div className="edit_book">
            <Modal
              key={getSelectedBook()?.id || 'no-selection'}
              btnClassName="add_card_edit"
              btnLabel="Edit"
              disabled={!hasSelectedBook()}
            >
              <EditBookForm
                book={getSelectedBook()}
                onUpdate={(updatedBook) => {
                  // Update the book in your books array
                  setNewBooks(
                    newBooks.map(
                      (book) =>
                        book.id === updatedBook.id
                          ? { ...updatedBook, selected: false } // ensure selected is false after update
                          : { ...book, selected: false } // deselect all other books
                    )
                  );
                }}
              />
            </Modal>
          </div>
          <button className="add_card_delete" onClick={DeleteBook}>
            Delete
          </button>
        </div>
        <div className="listing_container">
          {filterBooks.map((book) => (
            <Book
              key={book.id}
              {...book}
              onSelect={() => ToggleSelectionState(book.id)}
            />
          ))}
        </div>
      </div>
      <div className="footer">&copy; Hidayat Patil, 2025</div>
    </div>
  );
}

export default App;
