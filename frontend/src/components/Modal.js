import React from "react";

const Modal = ({ book, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                    onClick={onClose}
                >
                    ✕
                </button>
                <img
                    src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x192.png?text=No+Image"
                    }
                    alt={book.volumeInfo.title}
                    className="w-full h-64 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{book.volumeInfo.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
                <p className="text-sm">
                    {book.volumeInfo.description || "No description available."}
                </p>
            </div>
        </div>
    );
};

export default Modal;
