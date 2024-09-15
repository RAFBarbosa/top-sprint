import { gql, useQuery } from "@apollo/client";
import { isPast } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

const GET_FIRST_DRIVER = gql`
    query getFirstDriver {
        drivers(orderBy: availableAt_ASC, first: 1) {
            availableAt
        }
    }
`;

interface Drivers {
    drivers: {
        availableAt: string;
    }[];
}

export function Event() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { data } = useQuery<Drivers>(GET_FIRST_DRIVER);

    useEffect(() => {
        setShowModal(false);

        // if (!slug && data?.drivers) {
        //     const { availableAt, slug } = data.drivers[0];

        //     if (isPast(new Date(availableAt))) {
        //         navigate(`/event/driver/${slug}`);
        //     }
        // }
    }, [data]);

    function handleToggleMenu() {
        setShowModal(!showModal);
    }

    return (
        <div className="flex flex-col">
            <Header
                open={showModal}
                toggleMenu={handleToggleMenu}
            />
            <div className="flex flex-col min-h-screen">
                <main className="flex">
                    {/* {slug
                        ? <Video driverSlug={slug} />
                        : <div className="flex-1"></div>
                    } */}
                    <div className="hidden lg:flex">
                        <Sidebar />
                    </div>
                </main>
            </div>

            {showModal && (
                <Modal>
                    <Sidebar />
                </Modal>
            )}
        </div>
    )
}