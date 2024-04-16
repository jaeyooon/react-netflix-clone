import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e94084f6a121611f6e353ae63ac18617",
    language: "ko-KR",
  },
});

export default instance;