import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [query, setQuery] = useState("");
    const [startIndex, setStartIndex] = useState(0);

    const fetchBooks = async (newQuery = false) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5000/api/books?q=${query}&startIndex=${newQuery ? 0 : startIndex}`
            );
            const data = await response.json();
            setBooks(newQuery ? data : [...books, ...data]);
            setFilteredBooks(newQuery ? data : [...books, ...data]);
            if (newQuery) setStartIndex(10);
            else setStartIndex(startIndex + 10);
        } catch {
            console.error("Error fetching books");
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (book) => {
        const exists = favorites.find((fav) => fav.id === book.id);
        if (exists) {
            setFavorites(favorites.filter((fav) => fav.id !== book.id));
        } else {
            setFavorites([...favorites, book]);
        }
    };

    const sortBooks = (criteria) => {
        const sorted = [...filteredBooks].sort((a, b) => {
            if (criteria === "title") {
                return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
            } else if (criteria === "author") {
                return (a.volumeInfo.authors?.[0] || "").localeCompare(b.volumeInfo.authors?.[0] || "");
            } else if (criteria === "rating") {
                return (b.volumeInfo.averageRating || 0) - (a.volumeInfo.averageRating || 0);
            }
            return 0;
        });
        setFilteredBooks(sorted);
    };

    const filterBooks = (language) => {
        if (!language) {
            setFilteredBooks(books);
            return;
        }
        const filtered = books.filter((book) => book.volumeInfo.language === language);
        setFilteredBooks(filtered);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
            <header className="py-6 bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-300">
                        Google Books Explorer
                    </h1>
                    <ThemeSwitcher />
                </div>
            </header>
            <main className="container mx-auto py-6 px-4">
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    onSearch={() => fetchBooks(true)}
                    onSort={sortBooks}
                    onFilter={filterBooks}
                />
                {loading && (
                    <p className="text-center mt-8 text-lg font-semibold text-blue-600 dark:text-blue-300">
                        Loading...
                    </p>
                )}
                {!loading && filteredBooks.length > 0 && (
                    <>
                        <BookList
                            books={filteredBooks}
                            onBookClick={setSelectedBook}
                            toggleFavorite={toggleFavorite}
                            favorites={favorites}
                        />
                        <button
                            className="mt-8 mx-auto block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 transition-transform transform hover:scale-105"
                            onClick={() => fetchBooks()}
                        >
                            Load More
                        </button>
                    </>
                )}
                {!loading && filteredBooks.length === 0 && (
                    <p className="text-center mt-8 text-lg text-gray-600 dark:text-gray-400">
                        No books found.
                    </p>
                )}
                {selectedBook && <Modal book={selectedBook} onClose={() => setSelectedBook(null)} />}
                <Favorites favorites={favorites} onBookClick={setSelectedBook} />
            </main>
        </div>
    );
};

export default App;
