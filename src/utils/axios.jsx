import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWQ5NzkwZjk5MzUwYzUwNjdlOThmYmFmZmZiNmVjYSIsInN1YiI6IjY1ZTMwMTlkOWVlMGVmMDE4NTZmMmE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GBT2e_TNccziwjnjkIZdiJJnvr0U0j1TLQoAjW-QOxY",
  },
});

export default instance;