import { createContext, useState, useEffect } from "react";
import personalDetails from "@data/personalDetails.json";
import Fuse from "fuse.js";

const SearchContext = createContext();

const ALL = {
  experiences: personalDetails.filter((d) => d.type === "experience"),
  certifications: personalDetails.filter((d) => d.type === "certification"),
  blogs: personalDetails.filter((d) => d.type === "blog"),
  projects: personalDetails.filter((d) => d.type === "project"),
  videos: personalDetails.filter((d) => d.type === "video"),
  courses: personalDetails.filter((d) => d.type === "course"),
};

const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ ...ALL });

  const options = {
    includeScore: true,
    useExtendedSearch: true,
    keys: ["title", "description", "achievements", "company", "from"],
  };

  const fuse = new Fuse(personalDetails, options);

  useEffect(() => {
    if (!searchTerm) {
      setResults({ ...ALL });
    } else {
      const results = fuse.search(searchTerm).map((d) => d.item);
      setResults({
        experiences: results.filter((d) => d.type === "experience"),
        certifications: results.filter((d) => d.type === "certification"),
        blogs: results.filter((d) => d.type === "blog"),
        projects: results.filter((d) => d.type === "project"),
        videos: results.filter((d) => d.type === "video"),
        courses: results.filter((d) => d.type === "course"),
      });
    }
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
