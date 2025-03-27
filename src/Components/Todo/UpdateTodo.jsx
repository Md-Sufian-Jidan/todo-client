import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../../Hooks/UseAuth';
import axios from 'axios';
import { toast } from 'sonner';

const UpdateTodo = () => {
    const { user } = useAuth();
    const data = useLoaderData();
    const todo = data.data;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;

        const newTodo = {
            name: user?.displayName,
            email: user?.email || null,
            uid: user?.uid,
            title,
            description,
            category,
            completed: todo?.completed,
            createdAt: todo?.createdAt,
            updatedAt: new Date().toISOString(),
        };
        console.log(newTodo);

        // axios post
        axios.patch(`${import.meta.env.VITE_LOCALHOST_API}/todo/${todo?._id}`, newTodo)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    form.reset();
                    return toast.success('Todo Updated successfully');
                }
            })
            .catch(err => {
                console.log(err);
                return toast.error(err.message);
            });
        setLoading(false);
    };

    return (
        <div className='max-w-4xl mx-auto my-5'>
            <div className='space-y-5 text-center my-5'>
                <h2 className='text-4xl'>Modify Your Todo - Stay on Track!</h2>
                <p className='font-medium'>Need to tweak your plans? This route lets you update any todo item with a new title, description, status, or any other details. Simply provide the todo ID along with the updated data, and keep your task list perfectly organized! Note: Only the creator of the todo can make changes. 🚀</p>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={todo?.title}
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Enter todo title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (optional)
                        </label>
                        <textarea
                            defaultValue={todo?.description}
                            name="description"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Enter description"
                            rows={3}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            defaultValue={todo?.category}
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                        >
                            <option value="task">Regular Task</option>
                            <option value="wishlist">Wishlist</option>
                            <option value="bucketlist">Bucketlist</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2.5 rounded-lg bg-[#210F37] text-white font-medium flex items-center gap-1.5 hover:bg-[#210F37]/90 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            <PlusCircle size={18} />
                            <span>{loading ? 'Updating...' : 'Update Todo'}</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdateTodo;