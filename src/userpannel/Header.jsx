import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const token = Cookies.get("token");

    const handleLogout = () => { 
    Cookies.remove("token"); 
    Cookies.remove("role"); 
    Cookies.remove("userDetails");
    
    setIsOpen(false); 
    navigate("/");
    window.location.reload();
};

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                        Rest<span className="text-orange-500">Taste</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
                        >
                            Home
                        </Link>

                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-orange-500"
                    >
                        {isOpen ? (
                            <X size={26} />
                        ) : (
                            <Menu size={26} />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">

                        <div className="flex flex-col gap-4">

                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 hover:text-orange-500 transition-colors"
                            >
                                Home
                            </Link>

                            {!token ? (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-700 hover:text-orange-500 transition-colors"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="w-fit px-5 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="w-fit p-2 text-gray-700 hover:text-orange-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={21} />
                                </button>
                            )}

                        </div>
                    </div>
                )}

            </nav>
        </header>
    );
};

export default Navbar;