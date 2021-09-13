import axios from 'axios';
const getMovies = async () => {

    const movies = await axios.get('http://localhost:3900/api/movies');

  return movies;
};

export default getMovies;