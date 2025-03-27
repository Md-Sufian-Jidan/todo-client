import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { Search, ListTodo, Heart, CheckSquare, Target, X, Pocket, CheckCheck, PaintBucket } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyTodo = () => {
    const [todos, setTodos] = useState([]);
    console.log(todos);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_LOCALHOST_API}/todos`)
            .then(data => {
                // console.log(data.data);
                setTodos(data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDone = () => {
        console.log(`${import.meta.env.VITE_LOCALHOST_API}/todo`);
        // axios.delete(`${import.meta.env.VITE_LOCALHOST_API}/todo/${id}`)
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // console.log(id);
    };

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Search todos..."
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <X size={18} className="text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div> */}

                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Done Todo</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todos?.map((todo, idx) => <tr key={todo?._id}>
                                        {/* row 1 */}
                                        <th>{idx + 1}</th>
                                        <td>{todo?.title}</td>
                                        <td title={todo?.description}>{todo?.description.slice(0, 100)}...</td>
                                        <td><button onClick={handleDone} className='btn btn-success'>Done</button></td>
                                        <td><Link to={`/update/${todo?._id}`} className='btn'>Update</Link></td>
                                        <td><button className='btn btn-error'>Delete</button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default MyTodo;