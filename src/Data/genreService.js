import axios from "axios";
const getGenres = async () => {
  const genres = await axios.get("http://localhost:3900/api/genres");

  return genres.data;
};

export default getGenres;
