import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { Search, ListTodo, Heart, CheckSquare, Target, X, Pocket, CheckCheck, PaintBucket } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const MyTodo = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_LOCALHOST_API}/todos`)
            .then(data => {
                console.log(data.data);
                setTodos(data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDone = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You done this TODO!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, i done it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_LOCALHOST_API}/done-todo/${id}`)
                    .then(data => {
                        if (data.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Congratulations!",
                                text: "You have done this TODO.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return toast.error(err.message);
                    });
            };
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_LOCALHOST_API}/todo/${id}`)
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Todo has been deleted.",
                                icon: "success"
                            });
                            const remaining = todos.filter(todo => todo?._id !== id);
                            setTodos(remaining);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return toast.error(err.message);
                    });
            };
        });
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
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Category</th>
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
                                        <td>{todo?.category}</td>
                                        <td><button onClick={() => handleDone(todo?._id)} className='btn btn-success'>Done</button></td>
                                        <td><Link to={`/update/${todo?._id}`} className='btn'>Update</Link></td>
                                        <td><button onClick={() => handleDelete(todo?._id)} className='btn btn-error'>Delete</button></td>
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