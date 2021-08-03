import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({
  pageSize,
  totalItems,
  handlePagination,
  currentPage,
}) => {
  const pageCount = Math.ceil(totalItems / pageSize);
  const pages = _.range(1, pageCount + 1);
  return pageCount <= 1 ? null : (
    <div className="container">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePagination("-")}
              disabled={currentPage === 1 ? "disabled" : null}
            >
              Previous
            </button>
          </li>
          {pages.map((index) => (
            <li
              className={
                currentPage === index ? "page-item active" : "page-item"
              }
              key={index}
            >
              <a
                className="page-link"
                href="#!"
                onClick={() => handlePagination(index)}
              >
                {index}
              </a>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePagination("+")}
              disabled={currentPage === pageCount ? "disabled" : null}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
