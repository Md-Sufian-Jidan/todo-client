import { useLoaderData } from "react-router-dom";

const DoneTodo = () => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const data = useLoaderData();
    const todos = data.data;
    console.log(todos);
    return (
        <>
            <div className='space-y-5 text-center my-5'>
                <h2 className='text-4xl'>✅ Celebrate Your Wins – Mark Todos as Done!</h2>
                <p className='font-medium'>Every completed task is a step toward success! This route lets you mark your todos as done, helping you track progress and stay motivated. Check off your achievements, keep the momentum going, and take pride in how far you&#39;ve come! 🎉🔥</p>
            </div>
            <div className="overflow-x-auto my-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Completed At</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos?.map((todo, idx) => <tr key={todo?._id} className="bg-base-200">
                                {/* row 1 */}
                                <th>{idx + 1}</th>
                                <td>{todo?.title}</td>
                                <td title={todo?.description}>{todo?.description.slice(0, 100)}...</td>
                                <td>{todo?.completedAt ? new Date(todo.completedAt).toLocaleDateString("en-AE", options) : "completed date not recoded"}</td>
                                <td>{todo ? todo.completed.toString() : "No data"}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DoneTodo;