import { createBrowserRouter, Outlet } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Navbar from './components/Navbar/Navbar';

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/',
                element: <main><h1>Home Page</h1></main>
            }
        ]
    }
]);