import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ListTodo, Check } from 'lucide-react';
import TodoForm from '../../Components/Todo/TodoForm';

const AddTodo = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    // Display success message for 3 seconds after adding a todo
    const handleTodoAdded = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Todo</h1>
                        <p className="text-gray-600">Create a new task, wishlist item, or bucket list entry</p>
                    </div>

                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700"
                        >
                            <Check size={18} className="text-green-600" />
                            <span>Todo added successfully!</span>
                        </motion.div>
                    )}

                    {/* todo form */}
                    <TodoForm onSuccess={handleTodoAdded} />

                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <ListTodo size={20} />
                            <span>Why create a todo?</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                                        <PlusCircle size={16} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Stay Organized</h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Keep track of all your tasks in one place and never forget important deadlines.
                                </p>
                            </div>

                            <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-2">
                                        <PlusCircle size={16} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Track Wishlist</h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Save items you wish to buy or places you want to visit for future reference.
                                </p>
                            </div>

                            <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                                        <PlusCircle size={16} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Build a Bucketlist</h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Create a list of experiences or achievements you want to accomplish in your lifetime.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AddTodo;
