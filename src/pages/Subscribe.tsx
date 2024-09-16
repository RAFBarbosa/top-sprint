import { useState } from "react";
import { Teams } from "../components/Teams";
import { Header } from "../components/Header";
import { HallsOfFame } from "../components/HallsOfFame";
import { Footer } from "../components/Footer";
import { Standings } from "../components/Standings";

export function Subscribe() {

    const [showModal, setShowModal] = useState(false);


    function handleToggleMenu() {
        setShowModal(!showModal);
    }

    return (
        <div className="min-h-screen bg-blur bg-no-repeat bg-cover flex flex-col items-center">
            <Header
                open={showModal}
                toggleMenu={handleToggleMenu}
            />
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-10 md:mt-20 mx-auto">
                <Teams />
            </div>
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between my-10 md:mt-20 mx-auto">
                <HallsOfFame />
            </div>
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between my-10 md:mt-20 mx-auto">
                <Standings />
            </div>
            <div className="w-full bg-gray-900">
                <Footer />
            </div>
        </div >
    )
}