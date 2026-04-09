import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BookSearchProvider } from "./contexts/BookSearchProvider";
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <BookSearchProvider>
      <App />
    </BookSearchProvider>
  </HashRouter>,
)
