import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Header";
import Footer from "./Footer";


const UserWrapper = () => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer/>
        </>
    );
};

export default UserWrapper;