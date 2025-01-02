import React from "react";

const BookList = ({ books, onBookClick, toggleFavorite, favorites }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
                >
                    <img
                        src={
                            book.volumeInfo.imageLinks?.thumbnail ||
                            "https://via.placeholder.com/128x192.png?text=No+Image"
                        }
                        alt={book.volumeInfo.title}
                        className="w-full h-48 object-cover rounded"
                        onClick={() => onBookClick(book)}
                    />
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {book.volumeInfo.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                            <button
                                className={`px-3 py-1 text-sm rounded ${
                                    favorites.find((fav) => fav.id === book.id)
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-300 text-gray-800"
                                }`}
                                onClick={() => toggleFavorite(book)}
                            >
                                {favorites.find((fav) => fav.id === book.id) ? "Unfavorite" : "Favorite"}
                            </button>
                            <button
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                                onClick={() => onBookClick(book)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;
