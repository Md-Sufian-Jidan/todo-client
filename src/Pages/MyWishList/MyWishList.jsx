import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const MyWishList = () => {
    const data = useLoaderData();
    const todos = data.data;
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

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
                                text: "You have Fulfill one of your wish.",
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



    return (
        <>
            <div className='space-y-5 text-center my-5'>
                <h2 className='text-4xl'>🌟 Turn Dreams into Reality – Your Wishlist Awaits!</h2>
                <p className='font-medium'>Every great achievement starts with a wish! This route allows you to save and track the goals and tasks you aspire to complete. Keep your dreams in sight, take action, and watch your wishlist turn into accomplishments. Start today – your future self will thank you! 🚀✨</p>
            </div>
            <div className="overflow-x-auto my-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos?.map((todo, idx) => <tr key={todo?._id} className="hover:bg-base-300">
                                {/* row 1 */}
                                <th>{idx + 1}</th>
                                <td>{todo?.title}</td>
                                <td title={todo?.description}>{todo?.description.slice(0, 100)}...</td>
                                <td>{todo?.createdAt ? new Date(todo?.createdAt).toLocaleDateString("en-AE", options) : "Created date not recoded"}</td>
                                <td><button onClick={() => handleDone(todo?._id)} className='btn btn-success'>Done</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyWishList;