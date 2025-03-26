import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, EyeOff, Eye, AlertCircle, Github, Facebook, Mail } from 'lucide-react';
import { useAuth } from '../../../Hooks/UseAuth';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const { signInUser, googleLogin, githubLogin } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await signInUser(formData);
            if (success) {
                toast.success('User Login Successfully');
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            const success = await googleLogin();
            if (success) {
                navigate('/');
                return toast.success('User Login Successfully');
            }
        } catch (err) {
            setError(err.message || `Login with ${provider} failed. Please try again.`);
            return toast.error(err.message);
        }
    };

    const handleGithubLogin = async () => {
        setError('');
        try {
            const success = await githubLogin();
            if (success) {
                navigate('/');
                return toast.success('User Login Successfully');
            }
        } catch (err) {
            setError(err.message || `Login with ${provider} failed. Please try again.`);
            return toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-16 pb-12 flex flex-col justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Link to="/" className="flex items-center justify-center mb-6">
                    <span className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <span className="bg-primary text-white p-1 rounded">Todo</span>
                        <span>Master</span>
                    </span>
                </Link>

                <div className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 border border-gray-200">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700 text-sm">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12 5c1.6168 0 3.1013.55353 4.2863 1.4782l3.2271-3.2271C17.5879 1.845 14.8541.75 12 .75 7.4255.75 3.5635 3.4304 1.5199 7.3717l3.7424 2.9087C6.3447 7.1755 8.94507 5 12 5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M23.49 12.275c0-.8513-.0767-1.6797-.2254-2.4788H12v4.5588h6.4574c-.2761 1.4976-1.1138 2.7699-2.3805 3.6284v3.0034h3.8578c2.2622-2.0826 3.5553-5.1442 3.5553-8.7118z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.2623 14.2805c-.288-.8513-.4414-1.7556-.4414-2.6902 0-.9346.1632-1.839.4414-2.6902L1.52 5.9914C.5517 7.8338 0 9.863 0 12c0 2.137.5517 4.1662 1.5199 6.0086l3.7424-2.9087z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23.25c3.2813 0 6.0324-1.0683 8.0349-2.8942l-3.8578-3.0034c-1.0702.7188-2.4417 1.1476-4.1771 1.1476-3.0549 0-5.6553-2.0604-6.5781-4.8292L1.5199 16.596C3.5538 20.5291 7.4255 23.25 12 23.25z"
                                />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('facebook')}
                            className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <Facebook size={20} className="mr-2 text-blue-600" />
                            Facebook
                        </button>
                        <button
                            type="button"
                            onClick={handleGithubLogin}
                            className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <Github size={20} className="mr-2" />
                            GitHub
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <form className="mb-4 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center gap-1.5 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                <LogIn size={18} />
                                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/register"
                                className="w-full flex justify-center items-center gap-1.5 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Create a new account
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;