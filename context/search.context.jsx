import { createContext, useState, useEffect } from "react";
import personalDetails from "@data/personalDetails.json";
import axios from "axios";
import Fuse from "fuse.js";

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

  const options = {
    includeScore: true,
    useExtendedSearch: true,
    includeMatches: true,
    threshold: 0.3,
    minMatchCharLength: 3,
    ignoreLocation: true,
    keys: [
      {
        name: "title",
        weight: 0.3,
      },
      {
        name: "description",
        weight: 0.5,
      },
      {
        name: "achievements",
        weight: 0.5,
      },
      {
        name: "company",
        weight: 0.3,
      },
      {
        name: "from",
        weight: 0.3,
      },
    ],
  };

  const fuse = new Fuse(personalDetails, options);

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
