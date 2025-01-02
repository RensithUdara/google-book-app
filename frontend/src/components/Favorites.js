import React from "react";

const Favorites = ({ favorites, onBookClick }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Favorites</h2>
            {favorites.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No favorite books yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favorites.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
                            onClick={() => onBookClick(book)}
                        >
                            <img
                                src={
                                    book.volumeInfo.imageLinks?.thumbnail ||
                                    "https://via.placeholder.com/128x192.png?text=No+Image"
                                }
                                alt={book.volumeInfo.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                {book.volumeInfo.title}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
