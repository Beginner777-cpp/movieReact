const List = ({ genres, handleGenre, selectedGenre }) => {
  // "list-group-item active"
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre._id}
          className={selectedGenre._id === genre._id ? "list-group-item active" : "list-group-item"}
          aria-current="true"
          style={{ cursor: "pointer" }}
          onClick={() => handleGenre(genre)}
        >
          {genre.name}
        </li>
      ))}
      {/* 
      <li className="list-group-item">A second item</li>
      <li className="list-group-item">A third item</li>
      <li className="list-group-item">A fourth item</li>
      <li className="list-group-item">And a fifth one</li> */}
    </ul>
  );
};

export default List;
