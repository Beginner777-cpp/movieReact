import React from "react";
const SearchBox = ({query, handleSearch}) => {
  return (
    <input
      className="form-control my-5"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={query}
      onChange={(e) => handleSearch(e.currentTarget.value)}
    />
  );
};
export default SearchBox;
