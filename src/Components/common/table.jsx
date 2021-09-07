import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ handleSort, setColumnSort, columns, movies }) => {
  return (
    <table className="table">
      <TableHeader
        handleSort={handleSort}
        setColumnSort={setColumnSort}
        columns={columns}
      />
      <TableBody columns={columns} movies={movies} />
    </table>
  );
};

export default Table;
