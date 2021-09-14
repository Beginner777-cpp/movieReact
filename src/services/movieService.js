import getGenres from "./genreService";
import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/movies";
export const getMovies = () => {
  return http.get(apiEndpoint);
};
export const deleteMovie = (id) => {
  return http.delete(apiEndpoint + "/" + id);
};
export const saveMovie = async (movie) => {
  const { data: movies } = await getMovies();
  const { data: genres } = await getGenres();
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genreId = movie.genre._id;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  if (!movieInDb._id) {
    // movieInDb._id = String(Date.now());
    return await http.post(apiEndpoint, movieInDb);
  } else {
    delete movieInDb.genre;
    const id = movieInDb._id;
    delete movieInDb._id;
    return await http.put(apiEndpoint + "/" + id, movieInDb);
  }
};

export async function getMovie(id) {
  const { data: movies } = await getMovies();
  return movies.find((m) => m._id === id);
}
// export async function saveMovie(movie) {
// let movieInDb = movies.find((m) => m._id === movie._id) || {};
// movieInDb.title = movie.title;
// movieInDb.genre = await getGenres.find((g) => g._id === movie.genre._id);
// movieInDb.numberInStock = movie.numberInStock;
// movieInDb.dailyRentalRate = movie.dailyRentalRate;
// if (!movieInDb._id) {
//   movieInDb._id = String(Date.now());
//   movies.push(movieInDb);
// }

// return movieInDb;
// }

// export function deleteMovie(id) {
//   let movieInDb = movies.find((m) => m._id === id);
//   movies.splice(movies.indexOf(movieInDb), 1);
//   return movieInDb;
// }
