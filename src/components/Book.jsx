export default function Book({ title, subtitle, isbn13, price, url, id, selected, onSelect}) {
  return (
    <div className="book_container" onClick={onSelect}>
      <div className={`catalog_book ${selected ? "catalog_book_selection" : ""}`} >
        <img className="book_image" src={url} />
        <div className="book_data">
          <div className="author_name">
            <p>${price}</p>
          </div>
          {/* <a href={url} target="_blank" className="book_link" alt={title}>
            Learn More
          </a> */}
        </div>
      </div>
    </div>
  );
}


