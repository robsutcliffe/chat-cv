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
    if (!searchTerm) {
      setResults({ ...ALL });
    } else {
      const results = fuse
        .search(searchTerm)
        .sort((a, b) => b.score - a.score)
        .map((d) => ({ ...d.item, matches: d.matches }));

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
