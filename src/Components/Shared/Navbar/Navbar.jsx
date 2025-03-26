import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CheckSquare, ListTodo, PlusCircle, Heart, Target, LogOut } from 'lucide-react';
import { useAuth } from '../../../Hooks/UseAuth';
import { toast } from 'sonner';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: 'Home', path: '/', icon: <ListTodo size={18} /> },
        { name: 'Add Todo', path: '/add-todo', icon: <PlusCircle size={18} /> },
        { name: 'My Todo', path: '/my-todo', icon: <ListTodo size={18} /> },
        { name: 'My Wishlist', path: '/wishlist', icon: <Heart size={18} /> },
        { name: 'Done Todo', path: '/done', icon: <CheckSquare size={18} /> },
        { name: 'My BucketList', path: '/bucketList', icon: <Target size={18} /> }
    ];

    const isActive = (path) => location.pathname === path;

    const logout = () => {
        logOut()
            .then(result => {
                console.log(result);
                return toast.success('User logout successfully');
            })
            .catch(err => {
                return toast.error(err.message);
            });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/80 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:opacity-90 transition-opacity"
                    onClick={closeMenu}
                >
                    <span className="bg-primary text-white p-1 rounded">Todo</span>
                    <span>Master</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all duration-200 ${isActive(link.path)
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))}

                    {user ? (
                        <button
                            onClick={logout}
                            className="ml-2 px-4 py-2 flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-primary bg-white border border-primary rounded-md hover:bg-primary/5 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex items-center"
                    aria-label={isOpen ? "Close Menu" : "Open Menu"}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-white border-t border-gray-100"
                    >
                        <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 ${isActive(link.path)
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={closeMenu}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}

                            {user ? (
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="mt-2 px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <div className="flex flex-col space-y-2 mt-2">
                                    <Link
                                        to="/login"
                                        className="px-4 py-2.5 text-sm font-medium text-center text-primary bg-white border border-primary rounded-md hover:bg-primary/5 transition-colors"
                                        onClick={closeMenu}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-4 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                                        onClick={closeMenu}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
