import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { AddDriver } from "../components/AddDriver";

export function Subscribe() {

    const [showModal, setShowModal] = useState(false);


    function handleToggleMenu() {
        setShowModal(!showModal);
    }

    return (
        // CONTAINER
        <div className="min-h-screen bg-blur bg-no-repeat bg-cover flex flex-col items-center">
            {/* REACT LOGO BG */}
            <Header
                open={showModal}
                toggleMenu={handleToggleMenu}
            />

            {/* CONTENT */}
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-10 md:mt-20 mx-auto">
                <Sidebar />
                <AddDriver />

            </div>
        </div >
    )
}