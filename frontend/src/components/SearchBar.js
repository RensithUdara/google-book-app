import React from "react";

const SearchBar = ({ query, setQuery, onSearch, onSort, onFilter }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <input
                    type="text"
                    className="w-full max-w-lg px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                    placeholder="Search for books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
                    onClick={onSearch}
                >
                    Search
                </button>
            </div>
            <div className="flex gap-4">
                <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => onSort(e.target.value)}
                >
                    <option value="">Sort by</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                </select>
                <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => onFilter(e.target.value)}
                >
                    <option value="">Filter by Language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
