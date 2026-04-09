import { createContext } from "react";

const BookSearchContext = createContext({
  query: "",
  setQuery: () => {},
});

export default BookSearchContext;