import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../../Hooks/UseAuth';
import axios from 'axios';
import { toast } from 'sonner';

const TodoForm = ({ closeForm }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('task');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '') return;

        setLoading(true);

        const newTodo = {
            name: user?.displayName,
            email: user?.email || null,
            uid: user?.uid,
            title,
            description,
            category,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        // console.log(newTodo);
        // axios post
        axios.post(`${import.meta.env.VITE_LOCALHOST_API}/todo`, newTodo)
            .then(data => {
                console.log(data);
                if (data.data.insertedId) {
                    setTitle('');
                    setDescription('');
                    setCategory('task');
                    if (closeForm) closeForm();
                    return toast.success('Todo added successfully');
                }
            })
            .catch(err => {
                console.log(err);
                return toast.error(err.message);
            })


        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-5"
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Enter todo title"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description (optional)
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Enter description"
                        rows={3}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                        disabled={loading || !title.trim()}
                        className={`px-4 py-2.5 rounded-lg bg-primary text-white font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors ${loading || !title.trim() ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        <PlusCircle size={18} />
                        <span>{loading ? 'Adding...' : 'Add Todo'}</span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default TodoForm;