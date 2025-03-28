import { useLoaderData } from "react-router-dom";

const DoneTodo = () => {
    const data = useLoaderData();
    const todos = data.data;
    console.log(todos);
    return (
        <div>
            done todo
        </div>
    );
};

export default DoneTodo;