import * as Genres from "../../Data/fakeGenreService.js";
const List = (props) => {
  return (
    <ul className="list-group">
      <li className="list-group-item active" onClick={()=>props.handleGenre('all')}>All movies</li>
      {Genres.genres.map((genre, index) => (
        <li
          key={index}
          className="list-group-item"
          aria-current="true"
          style={{ cursor: "pointer" }}
          onClick={()=>props.handleGenre(genre.name)}
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
