import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
class TableBody extends Component {
  getColumn = (movie, column) => {
    if (column.content) {
      return column.content(movie);
    }
    return _.get(movie, column.path);
  };

  render() {
    const { movies, columns } = this.props;
    return (
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            {columns.map((column) => (
              <td key={movie._id + (column.path || column.key)}>
                {column.path === "title" ? (
                  <Link to={"/movies/" + movie._id}>
                    {this.getColumn(movie, column)}
                  </Link>
                ) : (
                  this.getColumn(movie, column)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
