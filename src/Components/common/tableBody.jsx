import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  getColumn = (movie, column) => {
    if (column.content) {
      return column.content(movie);
    }
    return _.get(movie, column.path);
  };

  render() {
    const { movies, columns, allMovies } = this.props;
    return (
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{allMovies.findIndex((el) => el._id === movie._id) + 1}</td>
            {columns.map((column) => (
              <td key={movie._id + (column.path || column.key)}>
                {this.getColumn(movie, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
