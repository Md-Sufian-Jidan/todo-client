import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <div className='h-[65px]'>
                <Navbar />
            </div>
            <div className='min-h-[calc(100vh-450px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;