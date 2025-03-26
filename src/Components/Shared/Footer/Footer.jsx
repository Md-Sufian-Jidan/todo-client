import { Link } from 'react-router-dom';
import { Github, Mail, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-3">
                            <span className="bg-primary text-white p-1 rounded">Todo</span>
                            <span>Master</span>
                        </Link>
                        <p className="text-gray-600 mb-4 max-w-md">
                            Streamline your productivity with our intuitive todo application.
                            Organize tasks, track your wishlist, and achieve your goals.
                        </p>
                        <div className="flex space-x-4">
                            <a target='_blank' href="https://github.com/Md-Sufian-Jidan" className="text-gray-500 hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                            <a target='_blank' href="https://www.linkedin.com/in/md-abu-sufian-jidan/" className="text-gray-500 hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a target='_blank' href="https://www.facebook.com/md.abu.sufian.158992" className="text-gray-500 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a target='_blank' mail="jidanjiyaj03@gmail.com" className="text-gray-500 hover:text-primary transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/add-todo" className="text-gray-600 hover:text-primary transition-colors">Add Todo</Link></li>
                            <li><Link to="/my-todo" className="text-gray-600 hover:text-primary transition-colors">My Todo</Link></li>
                            <li><Link to="/wishlist" className="text-gray-600 hover:text-primary transition-colors">My Wishlist</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to="/help" className="text-gray-600 hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-8 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} Todo Master. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
