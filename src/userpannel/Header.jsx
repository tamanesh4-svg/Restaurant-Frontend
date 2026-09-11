import { NavLink, Link, useNavigate } from "react-router-dom";
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

    const navLinkClass = ({ isActive }) =>
        `transition-colors duration-200 ${
            isActive
                ? "text-[#166534] font-bold"
                : "text-gray-700 hover:text-[#166534]"
        }`;

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                        Tasty<span className="text-[#166534]">Bites</span>
                    </Link>


                   
                    <div className="hidden md:flex items-center gap-8">

                       
                        <NavLink
                            to="/"
                            end
                            className={navLinkClass}
                        >
                            Home
                        </NavLink>


                        {!token ? (
                            <>
                                
                                <NavLink
                                    to="/login"
                                    className={navLinkClass}
                                >
                                    Login
                                </NavLink>

                               
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `px-5 py-2.5 rounded-lg bg-[#166534] text-white transition-colors duration-200 ${
                                            isActive
                                                ? "font-bold"
                                                : "font-medium"
                                        } hover:bg-[#14532D]`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-[#166534] transition-colors duration-200"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        )}

                    </div>


                    
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-[#166534]"
                    >
                        {isOpen ? (
                            <X size={26} />
                        ) : (
                            <Menu size={26} />
                        )}
                    </button>

                </div>


                {isOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">

                        <div className="flex flex-col gap-4">

                            
                            <NavLink
                                to="/"
                                end
                                onClick={() => setIsOpen(false)}
                                className={navLinkClass}
                            >
                                Home
                            </NavLink>


                            {!token ? (
                                <>
                                   
                                    <NavLink
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className={navLinkClass}
                                    >
                                        Login
                                    </NavLink>

                                  
                                    <NavLink
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `w-fit px-5 py-2.5 rounded-lg bg-[#166534] text-white transition-colors ${
                                                isActive
                                                    ? "font-bold"
                                                    : "font-medium"
                                            } hover:bg-[#14532D]`
                                        }
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="w-fit p-2 text-gray-700 hover:text-[#166534] transition-colors"
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