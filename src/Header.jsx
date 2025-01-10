import { useContext } from 'react';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdDarkMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AppContext } from './AppProvider';

const Header = () => {
    const { theme, dispatch, filteredData, setFilteredData } = useContext(AppContext);

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = filteredData.filter((article) =>
            article.source.name.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    return (
        <header className="bg-gray-900 text-gray-100 shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://img.icons8.com/?size=100&id=105890&format=png&color=000000"
                        alt="Company Logo"
                        className="w-10 h-10 rounded-md"
                    />
                    <span className="text-xl font-semibold tracking-wide">NewsPortal</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white transition duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        to="/sender"
                        className="text-gray-300 hover:text-white transition duration-200"
                    >
                        Sender
                    </Link>
                    <Link
                        to="/login"
                        className="text-gray-300 hover:text-white transition duration-200"
                    >
                        Logout
                    </Link>
                </nav>

                {/* Search and Theme Toggle */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleFilter}
                        className="bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                        onClick={() => dispatch()}
                        className={`p-2 rounded-md transition ${
                            theme === "light"
                                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                    >
                        {theme === "light" ? (
                            <TiWeatherPartlySunny size={20} />
                        ) : (
                            <MdDarkMode size={20} />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
