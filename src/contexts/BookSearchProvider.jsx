import { useState } from "react";
import BookSearchContext from "./BookSearchContext";

export function BookSearchProvider({ children }) {
  const [query, setQuery] = useState("harry potter"); // default search term

  return (
    <BookSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </BookSearchContext.Provider>
  );
}