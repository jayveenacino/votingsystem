import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

export default function Root() {
    const location = useLocation();
    const hideLayout = location.pathname === '/election';

    return (
        <>
            {!hideLayout && <Nav />}
            <main>
                <Outlet />
            </main>
            {!hideLayout && <Footer />}
        </>
    );
}
