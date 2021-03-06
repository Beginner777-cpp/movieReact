import React, { Component } from "react";
class TableHeader extends Component {
  onSort = (name) => {
    const { setColumnSort } = this.props;
    if (setColumnSort.name === name) {
      setColumnSort.type = setColumnSort.type === "asc" ? "desc" : "asc";
    }
    setColumnSort.name = name ? name : setColumnSort.name;
    this.props.handleSort(setColumnSort);
  };
  renderSortIcon = (column) => {
    const { setColumnSort } = this.props;
    if (column.path !== setColumnSort.name) {
      return null;
    }
    if (setColumnSort.type === "asc") {
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    }
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="clickable"
              key={column.path || column.key}
              onClick={() => this.onSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
          {/* <th onClick={() => this.onSort("title")}>Title</th>
          <th onClick={() => this.onSort("genre.name")}>Genre</th>
          <th onClick={() => this.onSort("numberInStock")}>Stock</th>
          <th onClick={() => this.onSort("dailyRentalRate")}>Rate</th> */}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
