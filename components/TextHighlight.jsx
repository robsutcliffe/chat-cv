import { useContext } from "react";
import { SearchContext } from "@context/search.context";

export default function TextHighlight({ text }) {
  const { searchTerm } = useContext(SearchContext);
  const regex = new RegExp(searchTerm, "gi");

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(
          regex,
          (match) => `<span class="text-black bg-gray-200">${match}</span>`,
        ),
      }}
    />
  );
}
