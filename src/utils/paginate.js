import _ from "lodash";
const paginate = (allMovies, currentPage, moviesPerPage) => {
  return _(allMovies)
    .slice(
      (currentPage - 1) * moviesPerPage,
      (currentPage - 1) * moviesPerPage + moviesPerPage
    )
    .value();
};

export default paginate;
