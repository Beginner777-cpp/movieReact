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
  render() {
      const {columns} = this.props;
    return (
      <thead>
        <tr>
          <th>№</th>
          {columns.map((column) => (
            <th key={column.path||column.key} onClick={() => this.onSort(column.path)}>{column.label}</th>
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
