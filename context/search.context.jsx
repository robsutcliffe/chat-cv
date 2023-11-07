import { createContext, useState, useEffect } from "react";
import axios from "axios";

const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({
    experiences: [],
    certifications: [],
    blogs: [],
    projects: [],
    videos: [],
    courses: [],
    tags: [],
    links: [],
    about: [],
  });

  useEffect(() => {
    const searchRequest = axios.CancelToken.source();
    axios(`/api/skills?searchTerm=${searchTerm}`, {
      cancelToken: searchRequest.token,
    })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      searchRequest.cancel();
    };
  }, [searchTerm]);

  const value = {
    searchTerm,
    setSearchTerm,
    results,
  };

  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
