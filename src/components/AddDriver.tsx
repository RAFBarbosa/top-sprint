import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { useCreateDriverMutation } from "../graphql/generated";
import CodeMockup from '/src/assets/code-mockup.png';
import { ReactLogo } from "./ReactLogo";
import { Sidebar } from "./Sidebar";
import { AssetCreateOneInlineInput } from "../graphql/generated";
import { Header } from "./Header";

export function AddDriver() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [driverNumber, setDriverNumber] = useState('');
    const [photo, setPhoto] = useState<AssetCreateOneInlineInput | null>(null);

    const [createDriver, { loading }] = useCreateDriverMutation();

    const [showModal, setShowModal] = useState(false);

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();

        await createDriver({
            variables: {
                name,
                team,
                driverNumber,
                photo: photo || null
            }
        })

        navigate('/event');
    }

    function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setPhoto({
                create: {
                    file: file,
                }
            });
        }
    }

    function handleToggleMenu() {
        setShowModal(!showModal);
    }

    return (
        // CONTAINER
        <div >
            {/* REACT LOGO BG */}

            {/* <div className="absolute mt-[10px] scale-50 md:scale-100">
                <ReactLogo />
            </div> */}

            {/* CONTENT */}
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-10 md:mt-20 mx-auto">

                {/* HEADER */}

                {/* <div className="max-w-[624px] items-center md:items-start flex flex-col">
                    <Logo />

                    <h1 className="mt-6 md:mt-8 text-[30px] md:text-[40px] mx-6 md:mx-0 text-center md:text-left leading-tight">
                        Construa uma
                        <strong className="text-blue-500"> aplicação completa</strong>
                        , do zero, com
                        <strong className="text-blue-500"> React JS</strong>
                    </h1>
                    <p className="mt-6 mx-6 text-sm md:text-base text-center md:ml-0 md:text-left text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div> */}

                {/* SUBSCRIBE */}
                <div className="w-full md:max-w-[391px] px-6 py-8 mt-8 md:px-8 md:mt-0 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-lg md:text-2xl mb-6 block">
                        Cadastro de Piloto


                    </strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="required required:border-red-500 text-base bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Nome do Piloto"
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Equipe"
                            onChange={event => setTeam(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Numero"
                            onChange={event => setDriverNumber(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Cadastrar Piloto
                        </button>
                        {/* <button type="button" className="bg-indigo-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50" disabled>
                        <div className="motion-reduce:hidden animate-spin"></div>
                            Processing...
                        </button> */}
                    </form>
                </div>
            </div>

            {/* IMAGE CODE */}
            {/* <img src={CodeMockup} className="z-10" alt="" /> */}

            {/* FOOTER */}
            {/* <div className="w-full bg-gray-900">
                <Footer />
            </div> */}
        </div >
    )
}