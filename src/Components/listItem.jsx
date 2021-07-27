

export default function ListItem(movie) {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "2px solid gray",
    borderBottom: "2px solid gray",
    flex: 1,
    padding: '20px'
  };
  const flex1 = {
    flex: 1,
  };
  const styleBtn = {
      marginLeft: 'auto',
      padding: '10px 15px'
  }
  return (
    <li key={movie._id} className="list" style={style}>
      <span style={flex1}>{movie.title}</span>
      <span style={flex1}>{movie.genre.name}</span>
      <span style={flex1}>{movie.numberInStock}</span>
      <span style={flex1}>{movie.dailyRentalRate}</span>
      <span style={flex1}><button style={styleBtn}  className="btn btn-danger">Delete</button></span>
      
    </li>
  );
}
