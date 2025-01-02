import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <div className="flex items-center">
            <div
                className={`relative inline-block w-12 h-6 transition duration-200 ease-linear rounded-full ${
                    isDarkMode ? "bg-green-400" : "bg-gray-300"
                }`}
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                <label
                    htmlFor="toggle"
                    className={`absolute left-0 w-6 h-6 mb-2 transition-transform duration-200 ease-linear transform bg-white border-2 border-gray-400 rounded-full cursor-pointer ${
                        isDarkMode ? "translate-x-6" : ""
                    }`}
                ></label>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
